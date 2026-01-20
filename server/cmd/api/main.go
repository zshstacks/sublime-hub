package main

import (
	"fmt"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	"github.com/zshstacks/markdown-zsh/modules/crypto"
	"github.com/zshstacks/markdown-zsh/modules/monitor"
	"github.com/zshstacks/markdown-zsh/modules/monitor/controllers"
	"github.com/zshstacks/markdown-zsh/modules/users"
	"gorm.io/gorm"
)

func main() {

	cfg := infrastructure.LoadConfig()

	db := infrastructure.ConnectToDB(cfg)
	infrastructure.SyncDatabase(db)

	e := echo.New()
	e.Use(middleware.Recover())
	e.Use(middleware.Logger())
	e.Use(middleware.Secure())

	e.Validator = &controllers.CustomValidator{Validator: validator.New()}

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     cfg.CORS.AllowedOrigins,
		AllowMethods:     cfg.CORS.AllowedMethods,
		AllowHeaders:     cfg.CORS.AllowedHeaders,
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           int((24 * time.Hour) / time.Millisecond),
	}))

	registerModules(e, db, cfg)

	e.Server.ReadTimeout = time.Duration(cfg.Server.ReadTimeout) * time.Second
	e.Server.WriteTimeout = time.Duration(cfg.Server.WriteTimeout) * time.Second

	port := fmt.Sprintf(":%s", cfg.Server.Port)
	e.Logger.Fatal(e.Start(port))
}

func registerModules(e *echo.Echo, db *gorm.DB, cfg infrastructure.AppConfig) {
	users.RegisterRoutes(e, db, cfg)

	monitor.RegisterRoutes(e, db, cfg)

	crypto.RegisterRoutes(e, db, cfg)
}
