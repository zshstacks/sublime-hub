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

func (mc *MonitorController) List(c echo.Context) error {
	user, ok := c.Get("user").(models.User)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to get user from context")
	}

	var monitors []models2.Monitor

	err := mc.DB.Where("user_id = ?", user.ID).
		Preload("Heartbeats", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at DESC").Limit(20) // only last data
		}).
		Find(&monitors).Error
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch monitors")
	}

	return c.JSON(http.StatusOK, monitors)
}

func (mc *MonitorController) Update(c echo.Context) error {
	id := c.Param("id")

	user, ok := c.Get("user").(models.User)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to get user from context")
	}

	var updateBody struct {
		Name        *string `json:"name"`
		URL         *string `json:"url"`
		Timeout     *int    `json:"timeout"`
		Interval    *int    `json:"interval"`
		NotifyEmail *bool   `json:"notify_email"`
		IsActive    *bool   `json:"is_active"`
	}
	if err := c.Bind(&updateBody); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "failed to read request body")
	}

	var monitor models2.Monitor
	if err := mc.DB.Where("id = ? AND user_id = ?", id, user.ID).First(&monitor).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "monitor not found")
	}

	updates := make(map[string]interface{})
	if updateBody.Name != nil {
		updates["name"] = *updateBody.Name
	}
	if updateBody.URL != nil {
		updates["url"] = *updateBody.URL
	}
	if updateBody.Timeout != nil {
		updates["timeout"] = *updateBody.Timeout
	}
	if updateBody.Interval != nil {
		updates["interval"] = *updateBody.Interval
	}
	if updateBody.NotifyEmail != nil {
		updates["notify_email"] = *updateBody.NotifyEmail
	}
	if updateBody.IsActive != nil {
		updates["is_active"] = *updateBody.IsActive
	}

	if len(updates) > 0 {
		if err := mc.DB.Model(&monitor).Updates(updates).Error; err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "failed to update monitor")
		}
	}

	return c.JSON(http.StatusOK, monitor)

}

func (mc *MonitorController) Delete(c echo.Context) error {
	id := c.Param("id")
	user, ok := c.Get("user").(models.User)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to get user from context")
	}

	result := mc.DB.Unscoped().Where("id = ? AND user_id = ?", id, user.ID).Delete(&models2.Monitor{})

	if result.Error != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to delete monitor")
	}

	if result.RowsAffected == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "monitor not found")
	}

	return c.NoContent(http.StatusNoContent)
}
