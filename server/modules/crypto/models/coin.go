package models

import (
	"time"

	"gorm.io/gorm"
)

type Coin struct {
	ID         uint           `gorm:"primarykey" json:"id"`
	CreatedAt  time.Time      `json:"createdAt"`
	UpdatedAt  time.Time      `json:"updatedAt"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Symbol     string         `gorm:"uniqueIndex;not null" json:"symbol"`
	Name       string         `gorm:"not null" json:"name"`
	BaseAsset  string         `gorm:"not null" json:"baseAsset"`
	Rank       int            `gorm:"index" json:"rank"`
	Categories []Category     `gorm:"many2many:coin_categories;" json:"categories"`
}
