package worker

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/zshstacks/markdown-zsh/modules/crypto/models"
	"gorm.io/gorm"
)

type CoinGeckoMarket struct {
	ID           string  `json:"id"`
	Symbol       string  `json:"symbol"`
	Name         string  `json:"name"`
	MarketCap    float64 `json:"market_cap"`
	TotalVolume  float64 `json:"total_volume"`
	CurrentPrice float64 `json:"current_price"`
}

func SyncMarketCapData(db *gorm.DB) {
	log.Println("Starting market cap sync...")

	url := "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		log.Printf("Failed to fetch market cap data: %v", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		log.Printf("CoinGecko API error (status %d): %s", resp.StatusCode, string(body))
		return
	}

	var geckoData []CoinGeckoMarket
	if err := json.NewDecoder(resp.Body).Decode(&geckoData); err != nil {
		log.Printf("Failed to decode market cap data: %v", err)
		return
	}

	log.Printf("Fetched %d coins from CoinGecko", len(geckoData))

	updated := 0
	for _, gecko := range geckoData {

		var coin models.Coin
		symbol := strings.ToUpper(gecko.Symbol)

		result := db.Where("UPPER(base_asset) = ?", symbol).First(&coin)
		if result.Error != nil {

			result = db.Where("symbol = ?", symbol+"USDT").First(&coin)
			if result.Error != nil {
				continue
			}
		}

		coin.MarketCap = &gecko.MarketCap
		coin.Volume24h = &gecko.TotalVolume

		if err := db.Save(&coin).Error; err != nil {
			log.Printf("Failed to update %s: %v", coin.Symbol, err)
			continue
		}

		updated++
	}

	log.Printf("Market cap sync completed: updated %d coins", updated)
}

func StartMarketCapSync(db *gorm.DB) {

	SyncMarketCapData(db)

	ticker := time.NewTicker(5 * time.Minute)
	go func() {
		for range ticker.C {
			SyncMarketCapData(db)
		}
	}()
}
