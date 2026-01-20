package worker

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/zshstacks/markdown-zsh/modules/crypto/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// this is the main structure returned by the Binance API
type BinanceExchangeInfo struct {
	Symbols []BinanceSymbol `json:"symbols"`
}

// describes one trading pair (example: BTCUSDT)
type BinanceSymbol struct {
	Symbol     string `json:"symbol"`     // "BTCUSDT"
	Status     string `json:"status"`     // "TRADING"
	BaseAsset  string `json:"baseAsset"`  // "BTC"
	QuoteAsset string `json:"quoteAsset"` // "USDT"
}

func FetchAndSyncCoins(db *gorm.DB) error {

	resp, err := http.Get("https://api.binance.com/api/v3/exchangeInfo")
	if err != nil {
		return fmt.Errorf("failed to fetch from binance: %w", err)
	}
	defer resp.Body.Close()

	var info BinanceExchangeInfo
	if err := json.NewDecoder(resp.Body).Decode(&info); err != nil {
		return fmt.Errorf("failed to decode binance json: %w", err)
	}

	var coinsToSync []models.Coin

	for _, s := range info.Symbols {
		if s.QuoteAsset == "USDT" && s.Status == "TRADING" {
			coinsToSync = append(coinsToSync, models.Coin{
				Symbol:    s.Symbol,
				Name:      s.BaseAsset,
				BaseAsset: s.BaseAsset,
				Rank:      999,
			})
		}
	}

	if len(coinsToSync) > 0 {
		err := db.Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "symbol"}},
			DoUpdates: clause.AssignmentColumns([]string{"name", "base_asset"}),
		}).Create(&coinsToSync).Error

		if err != nil {
			return fmt.Errorf("failed to sync coins to db: %w", err)
		}
	}
	return nil
}
