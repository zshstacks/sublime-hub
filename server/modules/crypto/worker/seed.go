package worker

import (
	"github.com/zshstacks/markdown-zsh/modules/crypto/models"
	"gorm.io/gorm"
)

func SeedCategories(db *gorm.DB) {
	categories := []models.Category{
		{Name: "Layer 1", Slug: "layer-1"},
		{Name: "DeFi", Slug: "defi"},
		{Name: "AI", Slug: "ai"},
	}

	for _, cat := range categories {
		db.FirstOrCreate(&cat, models.Category{Slug: cat.Slug})
	}

	var btc models.Coin
	if err := db.Where("symbol = ?", "BTCUSDT").First(&btc).Error; err == nil {
		var layer1 models.Category
		db.Where("slug = ?", "layer-1").First(&layer1)

		db.Model(&btc).Association("Categories").Append(&layer1)
	}
}
