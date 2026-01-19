package models

import "gorm.io/gorm"

type Coin struct {
	gorm.Model
	Symbol     string     `gorm:"uniqueIndex;not null" json:"symbol"` // BTCUSDT
	Name       string     `gorm:"not null" json:"name"`               // Bitcoin
	BaseAsset  string     `gorm:"not null" json:"baseAsset"`          // BTC
	Rank       int        `gorm:"index" json:"rank"`                  // order
	Categories []Category `gorm:"many2many:coin_categories;" json:"categories"`
}
