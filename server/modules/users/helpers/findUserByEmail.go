package helpers

import (
	"github.com/zshstacks/markdown-zsh/modules/users/models"
	"gorm.io/gorm"
)

func FindUserByEmail(db *gorm.DB, email string) (models.User, error) {
	var user models.User
	if err := db.First(&user, "email = ?", email).Error; err != nil {
		return user, err
	}
	return user, nil
}
