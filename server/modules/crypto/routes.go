package crypto

import (
	"context"
	"log"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	"github.com/zshstacks/markdown-zsh/internal/middleware"
	"github.com/zshstacks/markdown-zsh/modules/crypto/controllers"
	"github.com/zshstacks/markdown-zsh/modules/crypto/worker"
	"gorm.io/gorm"
)

func RegisterRoutes(e *echo.Echo, db *gorm.DB, cfg infrastructure.AppConfig) {
	hub := NewPriceHub()
	ctx := context.Background()

	go hub.Run(ctx)
	go worker.StartBinanceStream(ctx, hub.Broadcast)
	go worker.StartMarketCapSync(db)

	mc := controllers.NewCryptoController(db, cfg, hub)

	public := e.Group("/api/crypto")
	{
		public.GET("/market-stats", mc.GetMarketStats)
		public.GET("/coins", mc.ListCoins)
		public.GET("/categories", mc.ListCategories)
		public.GET("/ws", mc.HandleWS)
	}

	go func() {
		worker.FetchAndSyncCoins(db)
		worker.SeedCategories(db)

		for {
			log.Println("Updating market stats...")
			worker.SyncMarketStats(db)
			time.Sleep(10 * time.Minute)
		}
	}()

	private := e.Group("/api/crypto/user")
	private.Use(middleware.RequireAuth(db, cfg))
	{
		private.POST("/favorites", mc.AddToFavorites)
		private.GET("/favorites", mc.GetFavorites)
	}
}
