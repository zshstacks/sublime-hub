package controllers

import (
	"crypto/sha256"
	"encoding/hex"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	"github.com/zshstacks/markdown-zsh/modules/users/helpers"
	"github.com/zshstacks/markdown-zsh/modules/users/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthController struct {
	DB  *gorm.DB
	Cfg infrastructure.AppConfig
}

func NewAuthController(db *gorm.DB, cfg infrastructure.AppConfig) *AuthController {
	return &AuthController{DB: db, Cfg: cfg}
}

// Register (Notice the receiver `ac *AuthController`)
func (ac *AuthController) Register(c echo.Context) error {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Username string `json:"username"`
	}

	if err := c.Bind(&body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to read body")
	}
	// ... validation checks omitted for brevity (same as your code) ...

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 12)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to hash password")
	}

	user := models.User{
		Email:    body.Email,
		Password: string(hash),
		Username: body.Username,
	}

	const maxAttempts = 5
	var created bool
	for attempt := 1; attempt <= maxAttempts; attempt++ {
		u, err := helpers.GenerateUniqueID(12)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate unique id")
		}
		user.UniqueID = u

		// Use ac.DB
		if err := ac.DB.Create(&user).Error; err != nil {
			if strings.Contains(strings.ToLower(err.Error()), "duplicate") || strings.Contains(strings.ToLower(err.Error()), "unique") {
				if attempt == maxAttempts {
					return echo.NewHTTPError(http.StatusInternalServerError, "failed to create user due to id collision")
				}
				continue
			}
			return echo.NewHTTPError(http.StatusInternalServerError, "failed to create user")
		}
		created = true
		break
	}

	if !created {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to create user")
	}

	resp := struct {
		ID        uint      `json:"id"`
		UniqueID  string    `json:"unique_id"`
		Email     string    `json:"email"`
		Username  string    `json:"username"`
		CreatedAt time.Time `json:"created_at"`
	}{
		ID:        user.ID,
		UniqueID:  user.UniqueID,
		Email:     user.Email,
		Username:  user.Username,
		CreatedAt: user.CreatedAt,
	}

	return c.JSON(http.StatusOK, resp)
}

func (ac *AuthController) Login(c echo.Context) error {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.Bind(&body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to read body")
	}

	user, err := helpers.FindUserByEmail(ac.DB, body.Email)
	if err != nil || user.ID == 0 {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email or password")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email or password")
	}

	accessToken, err := helpers.SignJWT(ac.Cfg, user)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create access token")
	}

	c.SetCookie(&http.Cookie{
		Name:     "token",
		Value:    accessToken,
		Path:     "/",
		MaxAge:   ac.Cfg.JWT.AccessTokenTTL * 60,
		HttpOnly: true,
		Secure:   ac.Cfg.Cookie.Secure,
		SameSite: ac.Cfg.Cookie.SameSite,
	})

	tokenID := uuid.NewString()
	secret := uuid.NewString()
	hash := sha256.Sum256([]byte(secret))

	refresh := models.RefreshToken{
		TokenId:   tokenID,
		TokenHash: hex.EncodeToString(hash[:]),
		UserID:    user.ID,
		IssuedAt:  time.Now(),
		ExpiresAt: time.Now().Add(time.Duration(ac.Cfg.JWT.RefreshTokenTTL) * 24 * time.Hour),
	}
	if err := ac.DB.Create(&refresh).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create refresh token")
	}

	c.SetCookie(&http.Cookie{
		Name:     "refresh_token",
		Value:    tokenID + "." + secret,
		Path:     "/",
		MaxAge:   ac.Cfg.JWT.RefreshTokenTTL * 24 * 60 * 60,
		HttpOnly: true,
		Secure:   ac.Cfg.Cookie.Secure,
		SameSite: ac.Cfg.Cookie.SameSite,
	})

	resp := struct {
		ID       uint   `json:"id"`
		UniqueID string `json:"unique_id"`
		Email    string `json:"email"`
		Username string `json:"username"`
	}{
		ID:       user.ID,
		UniqueID: user.UniqueID,
		Email:    user.Email,
		Username: user.Username,
	}

	return c.JSON(http.StatusOK, resp)
}

func (ac *AuthController) Refresh(c echo.Context) error {

	_, err := helpers.TryRefresh(c, ac.DB, ac.Cfg)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Token refreshed",
	})
}

func (ac *AuthController) Logout(c echo.Context) error {
	cookie, err := c.Cookie("refresh_token")
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Refresh token missing")
	}

	parts := strings.SplitN(cookie.Value, ".", 2)
	tokenID := parts[0]

	var refresh models.RefreshToken
	ac.DB.First(&refresh, "token_id = ?", tokenID)
	now := time.Now()
	refresh.RevokedAt = &now
	ac.DB.Save(&refresh)

	c.SetCookie(&http.Cookie{
		Name:     "refresh_token",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   ac.Cfg.Cookie.Secure,
		SameSite: ac.Cfg.Cookie.SameSite,
	})
	c.SetCookie(&http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   ac.Cfg.Cookie.Secure,
		SameSite: ac.Cfg.Cookie.SameSite,
	})

	return c.JSON(http.StatusOK, map[string]string{"message": "Logged out"})
}

func (ac *AuthController) GetCurrentUser(c echo.Context) error {
	user := c.Get("user")
	userModel, ok := user.(models.User)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to retrieve user")
	}
	return c.JSON(http.StatusOK, userModel)
}
