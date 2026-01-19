package crypto

import (
	"github.com/labstack/echo/v4"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	"github.com/zshstacks/markdown-zsh/internal/middleware"
	"gorm.io/gorm"
)

func RegisterRoutes(e *echo.Echo, db *gorm.DB, cfg infrastructure.AppConfig) {

	private := e.Group("/api/crypto")
	private.Use(middleware.RequireAuth(db, cfg))
	{

	}
}
