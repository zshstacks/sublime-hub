package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UniqueID                  string `gorm:"uniqueIndex;size:12;not null" json:"uniqueID"`
	Email                     string `gorm:"uniqueIndex;size:40;not null" json:"email"`
	Username                  string `gorm:"size:30" json:"username"`
	Password                  string `gorm:"not null" json:"-"`
	IsEmailConfirmed          bool   `gorm:"default:false"`
	EmailConfirmationCode     string `gorm:"size:64" json:"-"`
	ConfirmationCodeExpiresAt time.Time
}
