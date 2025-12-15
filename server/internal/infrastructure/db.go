package infrastructure

import (
	"fmt"
	"log"

	"github.com/zshstacks/markdown-zsh/modules/users/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDB(cfg AppConfig) *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Europe/Riga",
		cfg.Database.Host,
		cfg.Database.User,
		cfg.Database.Password,
		cfg.Database.Name,
		cfg.Database.Port,
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(fmt.Sprintf("Failed to connect to database: %v", err))
	}

	log.Println("Connected to database successfully")
	return db
}

func SyncDatabase(db *gorm.DB) {

	err := db.AutoMigrate(
		&models.User{},
		&models.RefreshToken{},
	)

	if err != nil {
		log.Fatalf("Database migration error: %v", err)
	} else {
		log.Println("Database migrated successfully!")
	}
}
