package monitor

import (
	"github.com/labstack/echo/v4"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	"github.com/zshstacks/markdown-zsh/internal/middleware"
	"github.com/zshstacks/markdown-zsh/modules/monitor/controllers"
	"github.com/zshstacks/markdown-zsh/modules/monitor/worker"
	"gorm.io/gorm"
)

func RegisterRoutes(e *echo.Echo, db *gorm.DB, cfg infrastructure.AppConfig) {

	monitorWorker := worker.NewMonitorWorker(db)
	go monitorWorker.Start()

	mc := controllers.NewMonitorController(db, cfg)

	private := e.Group("/api/monitors")
	private.Use(middleware.RequireAuth(db, cfg))
	{
		private.POST("", mc.Create)
	}
}
