package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Name  string `gorm:"uniqueIndex;not null" json:"name"`
	Slug  string `gorm:"uniqueIndex;not null" json:"slug"`
	Coins []Coin `gorm:"many2many:coin_categories;" json:"coins,omitempty"`
}
