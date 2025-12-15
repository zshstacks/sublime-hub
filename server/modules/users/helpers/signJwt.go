package helpers

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	"github.com/zshstacks/markdown-zsh/modules/users/models"
)

type JWTClaims struct {
	Sub uint   `json:"sub"`
	UID string `json:"uid"`
	jwt.RegisteredClaims
}

func SignJWT(cfg infrastructure.AppConfig, user models.User) (string, error) {
	claims := JWTClaims{
		Sub: user.ID,
		UID: user.UniqueID,
		RegisteredClaims: jwt.RegisteredClaims{
			IssuedAt: jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(
				time.Now().Add(time.Duration(cfg.JWT.AccessTokenTTL) * time.Minute),
			),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secret := []byte(cfg.JWT.Secret)

	return token.SignedString(secret)
}
