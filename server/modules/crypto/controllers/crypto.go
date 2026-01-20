package controllers

import (
	"net/http"

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
	var coins []models.Coin
	if err := cc.db.Preload("Categories").Find(&coins).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Could not fetch coins"})
	}
	return c.JSON(http.StatusOK, coins)
}

func (cc *CryptoController) HandleWS(c echo.Context) error {
	conn, err := websocket.Accept(c.Response(), c.Request(), &websocket.AcceptOptions{
		OriginPatterns: []string{"*"},
	})
	if err != nil {
		return err
	}

	cc.hub.AddClient(conn)

	ctx := c.Request().Context()

	<-ctx.Done()

	conn.Close(websocket.StatusNormalClosure, "Connection closed by client or server")
	return nil
}

func (cc *CryptoController) AddToFavorites(c echo.Context) error {

	userID := c.Get("user_id").(uint)

	var req FavoriteRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request"})
	}

	var user userModel.User
	var coin models.Coin

	if err := cc.db.First(&user, userID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "User not found"})
	}

	if err := cc.db.First(&coin, req.CoinID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Coin not found"})
	}

	err := cc.db.Model(&user).Association("Favorites").Append(&coin)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Could not add to favorites"})
	}

	return c.JSON(http.StatusOK, echo.Map{"message": "Coin added to favorites"})
}
