package worker

import (
	"log"

	"github.com/zshstacks/markdown-zsh/modules/crypto/models"
	"gorm.io/gorm"
)

func SeedCategories(db *gorm.DB) {
	log.Println("Seeding categories...")

	categories := []models.Category{
		{Name: "Layer 1 Networks", Slug: "layer-1"},
		{Name: "DeFi Ecosystem", Slug: "defi"},
		{Name: "AI & Machine Learning", Slug: "ai"},
		{Name: "Gaming & NFT", Slug: "gaming-nft"},
		{Name: "Layer 2 Solutions", Slug: "layer-2"},
		{Name: "Meme Coins", Slug: "meme"},
		{Name: "Stablecoins", Slug: "stablecoins"},
	}

	for _, cat := range categories {
		var existing models.Category
		err := db.Where("slug = ?", cat.Slug).First(&existing).Error

		if err == gorm.ErrRecordNotFound {
			if err := db.Create(&cat).Error; err != nil {
				log.Printf("Failed to create category %s: %v", cat.Name, err)
			} else {
				log.Printf("Created category: %s", cat.Name)
			}
		} else {
			log.Printf("Category already exists: %s", cat.Name)
		}
	}

	// Assign some coins to categories based on their symbols
	assignCoinsToCategories(db)
}

func assignCoinsToCategories(db *gorm.DB) {
	log.Println("Assigning coins to categories...")

	// Layer 1 coins
	layer1Symbols := []string{"BTCUSDT", "ETHUSDT", "SOLUSDT", "ADAUSDT", "AVAXUSDT", "DOTUSDT", "ATOMUSDT"}
	assignCoinsBySymbol(db, layer1Symbols, "layer-1")

	// DeFi coins
	defiSymbols := []string{"UNIUSDT", "AAVEUSDT", "CRVUSDT", "COMPUSDT", "MKRUSDT", "SNXUSDT"}
	assignCoinsBySymbol(db, defiSymbols, "defi")

	// Gaming & NFT
	gamingSymbols := []string{"AXSUSDT", "SANDUSDT", "MANAUSDT", "ENJUSDT", "GALAUSDT"}
	assignCoinsBySymbol(db, gamingSymbols, "gaming-nft")

	// Meme coins
	memeSymbols := []string{"DOGEUSDT", "SHIBUSDT", "PEPEUSDT", "FLOKIUSDT", "BONKUSDT"}
	assignCoinsBySymbol(db, memeSymbols, "meme")

	// Stablecoins
	stableSymbols := []string{"USDTUSDT", "USDCUSDT", "BUSDUSDT", "DAIUSDT", "FDUSDUSDT"}
	assignCoinsBySymbol(db, stableSymbols, "stablecoins")

	// Layer 2
	layer2Symbols := []string{"MATICUSDT", "ARBUSDT", "OPUSDT", "IMXUSDT"}
	assignCoinsBySymbol(db, layer2Symbols, "layer-2")
}

func assignCoinsBySymbol(db *gorm.DB, symbols []string, categorySlug string) {
	var category models.Category
	if err := db.Where("slug = ?", categorySlug).First(&category).Error; err != nil {
		log.Printf("Category not found: %s", categorySlug)
		return
	}

	for _, symbol := range symbols {
		var coin models.Coin
		if err := db.Where("symbol = ?", symbol).First(&coin).Error; err != nil {
			continue
		}

		// Check if association already exists
		var count int64
		db.Table("coin_categories").
			Where("coin_id = ? AND category_id = ?", coin.ID, category.ID).
			Count(&count)

		if count == 0 {
			if err := db.Model(&coin).Association("Categories").Append(&category); err != nil {
				log.Printf("Failed to assign %s to %s: %v", coin.Symbol, category.Name, err)
			} else {
				log.Printf("Assigned %s to %s", coin.Symbol, category.Name)
			}
		}
	}
}
