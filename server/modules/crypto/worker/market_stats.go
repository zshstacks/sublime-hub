package worker

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/zshstacks/markdown-zsh/modules/crypto/models"
	"gorm.io/gorm"
)

type CoinGeckoGlobalResponse struct {
	Data struct {
		TotalMarketCap                  map[string]float64 `json:"total_market_cap"`
		TotalVolume                     map[string]float64 `json:"total_volume"`
		MarketCapPercentage             map[string]float64 `json:"market_cap_percentage"`
		MarketCapChangePercentage24hUsd float64            `json:"market_cap_change_percentage_24h_usd"`
		UpdatedAt                       int64              `json:"updated_at"`
	} `json:"data"`
}

type EtherscanGasResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Result  struct {
		SafeGasPrice    string `json:"SafeGasPrice"`
		ProposeGasPrice string `json:"ProposeGasPrice"`
		FastGasPrice    string `json:"FastGasPrice"`
	} `json:"result"`
}

func SyncMarketStats(db *gorm.DB) error {
	log.Println("Syncing market stats...")

	// Fetch global market data from CoinGecko
	resp, err := http.Get("https://api.coingecko.com/api/v3/global")
	if err != nil {
		log.Printf("Failed to fetch CoinGecko data: %v", err)
		return err
	}
	defer resp.Body.Close()

	var cgData CoinGeckoGlobalResponse
	if err := json.NewDecoder(resp.Body).Decode(&cgData); err != nil {
		log.Printf("Failed to decode CoinGecko data: %v", err)
		return err
	}

	// Fetch ETH gas price from Etherscan
	gasPrice := fetchEthGasPrice()

	// Create or update stats
	stats := models.MarketStats{
		TotalMarketCap:  cgData.Data.TotalMarketCap["usd"],
		MarketCapChange: cgData.Data.MarketCapChangePercentage24hUsd,
		Volume24h:       cgData.Data.TotalVolume["usd"],
		BTCDominance:    cgData.Data.MarketCapPercentage["btc"],
		EthGasPrice:     gasPrice,
	}

	stats.ID = 1

	if err := db.Save(&stats).Error; err != nil {
		log.Printf("Failed to save market stats: %v", err)
		return err
	}

	log.Printf("Market stats updated: Cap=$%.2fT (%.2f%%), Vol=$%.2fB, BTC=%.1f%%, Gas=%d gwei",
		stats.TotalMarketCap/1_000_000_000_000,
		stats.MarketCapChange,
		stats.Volume24h/1_000_000_000,
		stats.BTCDominance,
		stats.EthGasPrice,
	)

	return nil
}

func fetchEthGasPrice() int {
	client := &http.Client{Timeout: 10 * time.Second}

	//  Etherscan API (free, no key needed)
	resp, err := client.Get("https://api.etherscan.io/api?module=gastracker&action=gasoracle")
	if err != nil {
		log.Printf("Failed to fetch gas price: %v", err)
		return 20
	}
	defer resp.Body.Close()

	var gasData EtherscanGasResponse
	if err := json.NewDecoder(resp.Body).Decode(&gasData); err != nil {
		log.Printf("Failed to decode gas data: %v", err)
		return 20
	}

	if gasData.Status != "1" {
		log.Printf("Etherscan API error: %s", gasData.Message)
		return 20
	}

	//  "ProposeGasPrice" (standard gas price)
	var price int
	_, err = fmt.Sscanf(gasData.Result.ProposeGasPrice, "%d", &price)
	if err != nil {
		log.Printf("Failed to parse gas price: %v", err)
		return 20
	}

	return price
}
