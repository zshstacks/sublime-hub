package middleware

import (
	"errors"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	"github.com/zshstacks/markdown-zsh/modules/users/helpers"
	"github.com/zshstacks/markdown-zsh/modules/users/models"
	"gorm.io/gorm"
)

func getAccessTokenFromRequest(c echo.Context) (string, error) {
	cookie, err := c.Cookie("token")
	if err != nil {
		return "", echo.NewHTTPError(http.StatusUnauthorized, "Token is missing")
	}
	return cookie.Value, nil
}

func RequireAuth(db *gorm.DB, cfg infrastructure.AppConfig) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {

			tokenStr, err := getAccessTokenFromRequest(c)
			if err != nil {
				return err
			}

			claims, err := helpers.VerifyAccessToken(tokenStr, cfg)
			if err != nil {
				if errors.Is(err, jwt.ErrTokenExpired) {

					claims, err = helpers.TryRefresh(c, db, cfg)
					if err != nil {
						return err
					}
				} else {
					return echo.NewHTTPError(http.StatusUnauthorized, "Invalid token")
				}
			}

			user := models.User{}

			db.First(&user, claims.Sub)
			if user.ID == 0 {
				return echo.NewHTTPError(http.StatusUnauthorized, "User not found")
			}

			c.Set("user", user)
			return next(c)
		}
	}
}
