package worker

import (
	"encoding/json"
	"net/http"

	"github.com/zshstacks/markdown-zsh/modules/crypto/models"
	"gorm.io/gorm"
)

type CoinGeckoGlobalResponse struct {
	Data struct {
		TotalMarketCap      map[string]float64 `json:"total_market_cap"`
		TotalVolume         map[string]float64 `json:"total_volume"`
		MarketCapPercentage map[string]float64 `json:"market_cap_percentage"`
		UpdatedAt           int64              `json:"updated_at"`
	} `json:"data"`
}

func SyncMarketStats(db *gorm.DB) error {
	resp, err := http.Get("https://api.coingecko.com/api/v3/global")
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var cgData CoinGeckoGlobalResponse
	if err := json.NewDecoder(resp.Body).Decode(&cgData); err != nil {
		return err
	}

	stats := models.MarketStats{
		TotalMarketCap: cgData.Data.TotalMarketCap["usd"],
		Volume24h:      cgData.Data.TotalVolume["usd"],
		BTCDominance:   cgData.Data.MarketCapPercentage["btc"],
		EthGasPrice:    20,
	}

	stats.ID = 1
	return db.Save(&stats).Error
}
