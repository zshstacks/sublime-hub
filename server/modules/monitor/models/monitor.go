package models

import (
	"time"

	"github.com/zshstacks/markdown-zsh/modules/users/models"
	"gorm.io/gorm"
)

type Monitor struct {
	gorm.Model
	UserID        uint      `json:"userID"`
	Name          string    `gorm:"size:30" json:"name"`
	Type          string    `json:"type"`
	URL           string    `json:"url"`
	Timeout       int       `json:"timeout"`
	Interval      int       `json:"interval"`
	NotifyEmail   bool      `json:"notify_email"`
	IsActive      bool      `json:"is_active"`
	Status        string    `json:"status"`
	LastCheckedAt time.Time `json:"last_checked_at"`

	User models.User `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;" json:"user"`

	Heartbeats []Heartbeat `json:"heartbeats" gorm:"foreignKey:MonitorID;constraint:OnDelete:CASCADE;"`
}
