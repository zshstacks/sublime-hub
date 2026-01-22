package controllers

import (
	"errors"
	"log"
	"net/http"
	"sort"
	"time"

	"github.com/coder/websocket"
	"github.com/labstack/echo/v4"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	"github.com/zshstacks/markdown-zsh/modules/crypto/models"
	userModel "github.com/zshstacks/markdown-zsh/modules/users/models"
	"gorm.io/gorm"
)

type FavoriteRequest struct {
	CoinID uint `json:"coin_id" validate:"required"`
}

type WSProvider interface {
	AddClient(conn *websocket.Conn)
	RemoveClient(conn *websocket.Conn)
}

type CryptoController struct {
	db  *gorm.DB
	cfg infrastructure.AppConfig
	hub WSProvider
}

func NewCryptoController(db *gorm.DB, cfg infrastructure.AppConfig, hub WSProvider) *CryptoController {
	return &CryptoController{
		db:  db,
		cfg: cfg,
		hub: hub,
	}
}

func (cc *CryptoController) GetMarketStats(c echo.Context) error {
	var stats models.MarketStats
	if err := cc.db.First(&stats, 1).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Market stats not found"})
	}
	return c.JSON(http.StatusOK, stats)
}

func (cc *CryptoController) ListCoins(c echo.Context) error {
	filter := c.QueryParam("filter")     // "gainers", "new", or empty for all
	category := c.QueryParam("category") // category slug

	log.Printf("ListCoins called with filter=%s, category=%s", filter, category)

	query := cc.db.Preload("Categories")

	// Filter by category
	if category != "" && category != "all" {
		query = query.Joins("JOIN coin_categories ON coin_categories.coin_id = coins.id").
			Joins("JOIN categories ON categories.id = coin_categories.category_id").
			Where("categories.slug = ?", category)
	}

	var coins []models.Coin
	if err := query.Find(&coins).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Could not fetch coins"})
	}

	log.Printf("Found %d coins before filtering", len(coins))

	// Apply filters
	switch filter {
	case "gainers":
		// Sort by 24h volume (highest volume = top gainers)
		var gainers []models.Coin
		for _, coin := range coins {
			if coin.Volume24h != nil && *coin.Volume24h > 0 {
				gainers = append(gainers, coin)
			}
		}
		// Sort by volume descending using sort.Slice
		sort.Slice(gainers, func(i, j int) bool {
			return *gainers[i].Volume24h > *gainers[j].Volume24h
		})
		log.Printf("Returning %d gainers", len(gainers))
		return c.JSON(http.StatusOK, gainers)

	case "new":
		// Get coins created in the last 30 days
		thirtyDaysAgo := time.Now().AddDate(0, 0, -30)
		var newCoins []models.Coin
		for _, coin := range coins {
			if coin.CreatedAt.After(thirtyDaysAgo) {
				newCoins = append(newCoins, coin)
			}
		}
		// Sort by creation date (newest first)
		sort.Slice(newCoins, func(i, j int) bool {
			return newCoins[i].CreatedAt.After(newCoins[j].CreatedAt)
		})
		log.Printf("Returning %d new coins (created after %v)", len(newCoins), thirtyDaysAgo)
		return c.JSON(http.StatusOK, newCoins)

	default:
		// Return all coins sorted by market cap
		var sortedCoins []models.Coin
		for _, coin := range coins {
			if coin.MarketCap != nil && *coin.MarketCap > 0 {
				sortedCoins = append(sortedCoins, coin)
			}
		}
		// Sort by market cap descending using sort.Slice
		sort.Slice(sortedCoins, func(i, j int) bool {
			return *sortedCoins[i].MarketCap > *sortedCoins[j].MarketCap
		})
		log.Printf("Returning %d coins sorted by market cap", len(sortedCoins))
		return c.JSON(http.StatusOK, sortedCoins)
	}
}

func (cc *CryptoController) ListCategories(c echo.Context) error {
	var categories []models.Category
	if err := cc.db.Find(&categories).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Could not fetch categories"})
	}
	log.Printf("Returning %d categories", len(categories))
	return c.JSON(http.StatusOK, categories)
}

func (cc *CryptoController) HandleWS(c echo.Context) error {
	conn, err := websocket.Accept(c.Response().Writer, c.Request(), &websocket.AcceptOptions{
		OriginPatterns: []string{"*"},
	})
	if err != nil {
		return err
	}

	cc.hub.AddClient(conn)

	defer func() {
		cc.hub.RemoveClient(conn)
		conn.Close(websocket.StatusNormalClosure, "Connection closed")
	}()

	ctx := c.Request().Context()
	for {
		_, _, err := conn.Read(ctx)
		if err != nil {
			break
		}
	}

	return nil
}

func (cc *CryptoController) AddToFavorites(c echo.Context) error {
	val := c.Get("user")
	if val == nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"error": "Unauthorized"})
	}
	user, ok := val.(userModel.User)
	if !ok {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Invalid user context"})
	}

	var req FavoriteRequest
	if err := c.Bind(&req); err != nil {
		log.Printf("Bind error: %v", err)
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request format", "details": err.Error()})
	}

	log.Printf("Received coin_id: %d for user: %d", req.CoinID, user.ID)

	if req.CoinID == 0 {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "coin_id is required and must be greater than 0"})
	}

	var coin models.Coin
	if err := cc.db.First(&coin, req.CoinID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, echo.Map{"error": "Coin not found"})
		}
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Database error"})
	}

	var count int64
	cc.db.Table("user_favorites").Where("user_id = ? AND coin_id = ?", user.ID, coin.ID).Count(&count)

	if count > 0 {
		if err := cc.db.Model(&user).Association("Favorites").Delete(&coin); err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to remove favorite"})
		}
		return c.JSON(http.StatusOK, echo.Map{"message": "Removed from favorites", "isFavorite": false, "coinId": coin.ID})
	}

	if err := cc.db.Model(&user).Association("Favorites").Append(&coin); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to add favorite"})
	}
	return c.JSON(http.StatusOK, echo.Map{"message": "Added to favorites", "isFavorite": true, "coinId": coin.ID})
}

func (cc *CryptoController) GetFavorites(c echo.Context) error {
	val := c.Get("user")
	if val == nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"error": "Unauthorized"})
	}
	userContext := val.(userModel.User)

	var user userModel.User
	if err := cc.db.Preload("Favorites.Categories").First(&user, userContext.ID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, echo.Map{"error": "User not found"})
		}
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Database error"})
	}

	return c.JSON(http.StatusOK, user.Favorites)
}
