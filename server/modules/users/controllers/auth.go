package controllers

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"log"
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

func (ac *AuthController) VerifyEmail(c echo.Context) error {
	var body struct {
		Email string `json:"email"`
		Code  string `json:"code"`
	}

	if err := c.Bind(&body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to read body")
	}

	user, err := helpers.FindUserByEmail(ac.DB, body.Email)
	if err != nil || user.ID == 0 {
		return echo.NewHTTPError(http.StatusBadRequest, "No user with that email exists")
	}

	if user.EmailConfirmationCode != body.Code {
		return echo.NewHTTPError(http.StatusBadRequest, "Code does not match")
	}

	if time.Now().After(user.ConfirmationCodeExpiresAt) {
		return echo.NewHTTPError(http.StatusBadRequest, "User confirmation code expired")
	}

	user.IsEmailConfirmed = true
	user.EmailConfirmationCode = ""
	user.ConfirmationCodeExpiresAt = time.Time{}

	ac.DB.Save(&user)

	return c.JSON(http.StatusOK, map[string]string{"message": "Email verified"})

}

func (ac *AuthController) ResendOTP(c echo.Context) error {
	var body struct {
		Email string `json:"email"`
	}

	if err := c.Bind(&body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to read body")
	}

	user, err := helpers.FindUserByEmail(ac.DB, body.Email)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "No user with that email exists")
	}

	if user.IsEmailConfirmed == true {
		return echo.NewHTTPError(http.StatusBadRequest, "You already confirmed your email")
	}

	otp, err := helpers.GenerateOTP(6)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate OTP")
	}

	user.EmailConfirmationCode = otp
	user.ConfirmationCodeExpiresAt = time.Now().Add(15 * time.Minute)

	ac.DB.Save(&user)

	go func(email, code string) {
		log.Printf("Trying to sent new Email OTP to: %s", email)

		htmlBody, err := infrastructure.ParseTemplate(code, "templates/verify_email.html")
		if err != nil {
			log.Printf("Template error ResendOTP: %v", err)
			return
		}

		err = infrastructure.SendEmail(ac.Cfg, email, "Your new confirmation code", htmlBody)
		if err != nil {
			log.Printf("SMTP error ResendOTP: %v", err)
		} else {
			log.Printf("Email successfully sent to %s", email)
		}
	}(user.Email, otp)

	return c.JSON(http.StatusOK, map[string]string{"message": "Successfully sent confirmation code"})
}

func (ac *AuthController) ForgotPassword(c echo.Context) error {
	var body struct {
		Email string `json:"email"`
	}

	if err := c.Bind(&body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to read body")
	}

	user, err := helpers.FindUserByEmail(ac.DB, body.Email)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "No user with that email exists")
	}

	otp, err := helpers.GenerateOTP(6)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate OTP")
	}

	user.PasswordResetCode = otp
	user.PasswordResetCodeExpiresAt = time.Now().Add(15 * time.Minute)

	ac.DB.Save(&user)

	go func(email, code string) {
		log.Printf("Trying to sent new Email OTP to: %s", email)

		htmlBody, err := infrastructure.ParseTemplate(code, "templates/reset_password.html")
		if err != nil {
			log.Printf("Template error ResendOTP: %v", err)
		}

		err = infrastructure.SendEmail(ac.Cfg, email, "Your new reset password code", htmlBody)
		if err != nil {
			log.Printf("SMTP error ResendOTP: %v", err)
		} else {
			log.Printf("Email successfully sent to %s", email)
		}

	}(user.Email, otp)

	return c.JSON(http.StatusOK, map[string]string{"message": "Successfully sent reset password"})

}

func (ac *AuthController) ResetPassword(c echo.Context) error {
	var body struct {
		Email       string `json:"email"`
		Code        string `json:"code"`
		NewPassword string `json:"new_password"`
	}

	if err := c.Bind(&body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to read body")
	}

	if body.Email == "" || body.Code == "" || body.NewPassword == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "All fields (email, code, new_password) are required")
	}

	user, err := helpers.FindUserByEmail(ac.DB, body.Email)
	if err != nil || user.ID == 0 {
		return echo.NewHTTPError(http.StatusBadRequest, "User not found")
	}

	if user.PasswordResetCode == "" || user.PasswordResetCode != body.Code {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid or already used reset code")
	}

	if time.Now().After(user.PasswordResetCodeExpiresAt) {
		return echo.NewHTTPError(http.StatusBadRequest, "Reset code expired")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.NewPassword), 12)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Error processing password")
	}

	user.Password = string(hash)
	user.PasswordResetCode = ""
	user.PasswordResetCodeExpiresAt = time.Time{}

	if err := ac.DB.Save(&user).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update user")
	}

	//soft revoke
	now := time.Now()
	err = ac.DB.Model(&models.RefreshToken{}).
		Where("user_id = ? AND revoked_at IS NULL", user.ID).
		Updates(map[string]interface{}{
			"revoked_at": &now,
		}).Error

	if err != nil {
		log.Printf("Failed to revoke tokens: %v", err)
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Password updated successfully. All previous sessions have been logged out.",
	})
}

func (ac *AuthController) Register(c echo.Context) error {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Username string `json:"username"`
	}

	if err := c.Bind(&body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to read body")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 12)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to hash password")
	}

	user := models.User{
		Email:    body.Email,
		Password: string(hash),
		Username: body.Username,
	}

	otp, err := helpers.GenerateOTP(6)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate otp")
	}
	user.EmailConfirmationCode = otp
	user.ConfirmationCodeExpiresAt = time.Now().Add(15 * time.Minute)

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

	go func(email, code string) {
		htmlBody, err := infrastructure.ParseTemplate(code, "templates/verify_email.html")
		if err != nil {
			log.Printf("Template error: %v", err)
			return
		}
		err = infrastructure.SendEmail(ac.Cfg, email, "Your new confirmation code", htmlBody)
		if err != nil {
			log.Printf("Email error: %v", err)
		}

	}(user.Email, otp)

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

func (ac *AuthController) finalizeSession(c echo.Context, user models.User) error {

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

	// OAuth  Redirect
	if strings.HasPrefix(c.Path(), "/auth/oauth") {
		return c.Redirect(http.StatusSeeOther, "http://localhost:3000/hub")
	}

	return c.JSON(http.StatusOK, struct {
		ID       uint   `json:"id"`
		UniqueID string `json:"unique_id"`
		Email    string `json:"email"`
		Username string `json:"username"`
	}{
		ID:       user.ID,
		UniqueID: user.UniqueID,
		Email:    user.Email,
		Username: user.Username,
	})
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

	if user.IsEmailConfirmed == false {
		return echo.NewHTTPError(http.StatusForbidden, "Your email is not confirmed")
	}

	if user.OAuthProvider != models.AuthProviderLocal {
		return echo.NewHTTPError(http.StatusBadRequest, "Please use social login for this account")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid email or password")
	}

	return ac.finalizeSession(c, user)
}

// GOOGLE OAUTH
func (ac *AuthController) GoogleLogin(c echo.Context) error {
	config := ac.Cfg.GetGoogleConfig()
	state := helpers.GenerateRandomString(16)

	c.SetCookie(&http.Cookie{
		Name:     "oauth_state",
		Value:    state,
		Path:     "/",
		MaxAge:   900,
		HttpOnly: true,
		Secure:   ac.Cfg.Cookie.Secure,
		SameSite: ac.Cfg.Cookie.SameSite,
	})

	url := config.AuthCodeURL(state)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (ac *AuthController) GoogleCallback(c echo.Context) error {
	//check state  csrf stuff
	stateFromGoogle := c.QueryParam("state")
	stateCookie, err := c.Cookie("oauth_state")
	if err != nil || stateFromGoogle != stateCookie.Value {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid OAuth state")
	}

	c.SetCookie(&http.Cookie{Name: "oauth_state", Value: "", Path: "/", MaxAge: -1})

	code := c.QueryParam("code")
	config := ac.Cfg.GetGoogleConfig()
	tok, err := config.Exchange(context.Background(), code)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Exchange failed")
	}

	client := config.Client(context.Background(), tok)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v3/userinfo")
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Failed to get user info")
	}
	defer resp.Body.Close()

	var gUser struct {
		Sub   string `json:"sub"`
		Email string `json:"email"`
		Name  string `json:"name"`
	}
	json.NewDecoder(resp.Body).Decode(&gUser)

	var user models.User
	err = ac.DB.Where("o_auth_provider_id = ? AND o_auth_provider = ?", gUser.Sub, models.AuthProviderGoogle).First(&user).Error

	if err != nil {
		// check if email is 'local'
		var existing models.User
		if err := ac.DB.Where("email = ?", gUser.Email).First(&existing).Error; err == nil {
			if existing.OAuthProvider == models.AuthProviderLocal {
				return c.JSON(http.StatusConflict, map[string]string{
					"error": "account_exists_with_password",
				})
			}
		}

		// new user
		uID, _ := helpers.GenerateUniqueID(12)
		user = models.User{
			UniqueID:         uID,
			Email:            gUser.Email,
			Username:         gUser.Name,
			OAuthProvider:    models.AuthProviderGoogle,
			OAuthProviderID:  gUser.Sub,
			IsEmailConfirmed: true,
		}
		ac.DB.Create(&user)
	}

	return ac.finalizeSession(c, user)
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

func (ac *AuthController) DeleteUser(c echo.Context) error {
	user := c.Get("user")
	userModel, ok := user.(models.User)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to retrieve user")
	}

	// Start a transaction to ensure all related data is deleted
	tx := ac.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Unscoped().Where("user_id = ?", userModel.ID).Delete(&models.RefreshToken{}).Error; err != nil {
		tx.Rollback()
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to delete user tokens")
	}

	// Hard delete
	if err := tx.Unscoped().Delete(&userModel).Error; err != nil {
		tx.Rollback()
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to delete user")
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to complete deletion")
	}

	// Clear cookies
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

	return c.JSON(http.StatusOK, map[string]string{"message": "User permanently deleted"})
}

func (ac *AuthController) GetCurrentUser(c echo.Context) error {
	user, ok := c.Get("user").(models.User)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to retrieve user from context")
	}

	return c.JSON(http.StatusOK, user)
}
