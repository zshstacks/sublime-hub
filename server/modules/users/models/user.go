package models

import (
	"time"

	"gorm.io/gorm"
)

const (
	AuthProviderLocal  string = "local"
	AuthProviderGoogle string = "google"
)

type User struct {
	gorm.Model
	UniqueID                   string `gorm:"uniqueIndex;size:12;not null" json:"uniqueID"`
	Email                      string `gorm:"uniqueIndex;size:40;not null" json:"email"`
	Username                   string `gorm:"size:30" json:"username"`
	Password                   string `json:"-"`
	OAuthProvider              string `gorm:"default:'local'"`
	OAuthProviderID            string `gorm:"index"`
	IsEmailConfirmed           bool   `gorm:"default:false"`
	EmailConfirmationCode      string `gorm:"size:64" json:"-"`
	ConfirmationCodeExpiresAt  time.Time
	PasswordResetCode          string `gorm:"size:64" json:"-"`
	PasswordResetCodeExpiresAt time.Time
}
