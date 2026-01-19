package models

import "gorm.io/gorm"

type MarketStats struct {
	gorm.Model
	TotalMarketCap  float64 `json:"totalMarketCap"`
	MarketCapChange float64 `json:"marketCapChange"` // percen. change
	Volume24h       float64 `json:"volume24h"`
	BTCDominance    float64 `json:"btcDominance"`
	EthGasPrice     int     `json:"ethGasPrice"`
}
