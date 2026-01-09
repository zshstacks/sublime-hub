package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	models2 "github.com/zshstacks/markdown-zsh/modules/monitor/models"
	"github.com/zshstacks/markdown-zsh/modules/users/models"
	"gorm.io/gorm"
)

type MonitorController struct {
	DB  *gorm.DB
	Cfg infrastructure.AppConfig
}

func NewMonitorController(db *gorm.DB, cfg infrastructure.AppConfig) *MonitorController {
	return &MonitorController{DB: db, Cfg: cfg}
}

func (mc *MonitorController) Create(c echo.Context) error {
	var body struct {
		Name        string `json:"name"`
		Type        string `json:"type"`
		URL         string `json:"url"`
		Timeout     int    `json:"timeout"`
		Interval    int    `json:"interval"`
		NotifyEmail bool   `json:"notify_email"`
	}

	user, ok := c.Get("user").(models.User)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to get user from context")
	}

	if err := c.Bind(&body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "failed to read request body")
	}

	newMonitor := models2.Monitor{
		UserID:      user.ID,
		Name:        body.Name,
		Type:        body.Type,
		URL:         body.URL,
		Timeout:     body.Timeout,
		Interval:    body.Interval,
		NotifyEmail: body.NotifyEmail,
		IsActive:    true,
		Status:      "pending",
	}

	if err := mc.DB.Create(&newMonitor).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to create monitor")
	}

	if err := mc.DB.Preload("User").First(&newMonitor, newMonitor.ID).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to load user data")
	}

	return c.JSON(http.StatusCreated, newMonitor)
}
