package controllers

import (
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/zshstacks/markdown-zsh/internal/infrastructure"
	monitorModels "github.com/zshstacks/markdown-zsh/modules/monitor/models"
	userModels "github.com/zshstacks/markdown-zsh/modules/users/models"
	"gorm.io/gorm"
)

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}

type MonitorController struct {
	DB  *gorm.DB
	Cfg infrastructure.AppConfig
}

func NewMonitorController(db *gorm.DB, cfg infrastructure.AppConfig) *MonitorController {
	return &MonitorController{DB: db, Cfg: cfg}
}

type CreateMonitorInput struct {
	Name        string `json:"name" validate:"required,min=3,max=30"`
	Type        string `json:"type" validate:"required,oneof=http https tcp"`
	URL         string `json:"url" validate:"required,url"`
	Timeout     int    `json:"timeout" validate:"required,min=1,max=30"`
	Interval    int    `json:"interval" validate:"required,min=30,max=3600"`
	NotifyEmail bool   `json:"notify_email"`
}

func (mc *MonitorController) Create(c echo.Context) error {
	var body CreateMonitorInput
	if err := c.Bind(&body); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request body")
	}

	if err := c.Validate(body); err != nil {
		return echo.NewHTTPError(http.StatusUnprocessableEntity, map[string]string{
			"message": "Validation failed",
			"error":   err.Error(),
		})
	}

	user, _ := c.Get("user").(userModels.User)

	newMonitor := monitorModels.Monitor{
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
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create monitor")
	}

	return c.JSON(http.StatusCreated, newMonitor)
}

func (mc *MonitorController) List(c echo.Context) error {
	user, _ := c.Get("user").(userModels.User)
	var monitors []monitorModels.Monitor

	err := mc.DB.Where("user_id = ?", user.ID).
		Preload("Heartbeats", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at DESC").Limit(20)
		}).
		Find(&monitors).Error

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to fetch monitors")
	}

	return c.JSON(http.StatusOK, monitors)
}

func (mc *MonitorController) Update(c echo.Context) error {
	id := c.Param("id")
	user, _ := c.Get("user").(userModels.User)

	var updateBody struct {
		Name        *string `json:"name" validate:"omitempty,min=3,max=30"`
		URL         *string `json:"url" validate:"omitempty,url"`
		Timeout     *int    `json:"timeout" validate:"omitempty,min=1,max=30"`
		Interval    *int    `json:"interval" validate:"omitempty,min=30,max=3600"`
		NotifyEmail *bool   `json:"notify_email"`
		IsActive    *bool   `json:"is_active"`
	}

	if err := c.Bind(&updateBody); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request body")
	}

	var monitor monitorModels.Monitor
	if err := mc.DB.Where("id = ? AND user_id = ?", id, user.ID).First(&monitor).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Monitor not found")
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
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to update")
		}
	}

	return c.JSON(http.StatusOK, monitor)
}

func (mc *MonitorController) GetStats(c echo.Context) error {
	id := c.Param("id")
	user, ok := c.Get("user").(userModels.User)
	if !ok {
		return echo.NewHTTPError(http.StatusInternalServerError, "Not authenticated")
	}
	var monitor monitorModels.Monitor
	if err := mc.DB.Where("id = ? AND user_id = ?", id, user.ID).First(&monitor).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "monitor not found")
	}

	periodParam := c.QueryParam("period")
	intervals := map[string]string{
		"24h": "24 hours",
		"7d":  "7 days",
		"30d": "30 days",
	}
	dbInterval, exists := intervals[periodParam]
	if !exists {
		dbInterval = "24 hours"
	}

	var stats monitorModels.MonitorStats
	query := fmt.Sprintf(`
		SELECT 
			COUNT(*) as total_checks,
			COALESCE(AVG(latency), 0) as average_latency,
			(COUNT(CASE WHEN status_code >= 200 AND status_code < 300 THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0)) as uptime_percentage
		FROM heartbeats 
		WHERE monitor_id = ? AND created_at > NOW() - INTERVAL '%s'`, dbInterval)

	if err := mc.DB.Raw(query, id).Scan(&stats).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to calculate stats")
	}

	return c.JSON(http.StatusOK, stats)
}

func (mc *MonitorController) GetChartData(c echo.Context) error {
	id := c.Param("id")
	user, _ := c.Get("user").(userModels.User)

	var monitor monitorModels.Monitor
	if err := mc.DB.Where("id = ? AND user_id = ?", id, user.ID).First(&monitor).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "monitor not found")
	}

	var points []monitorModels.ChartPoint
	query := `
		SELECT 
			date_trunc('hour', created_at) as timestamp,
			AVG(latency) as latency,
			(COUNT(CASE WHEN status_code >= 200 AND status_code < 300 THEN 1 END) * 100.0 / COUNT(*)) as uptime
		FROM heartbeats
		WHERE monitor_id = ? AND created_at > NOW() - INTERVAL '24 hours'
		GROUP BY timestamp
		ORDER BY timestamp ASC`

	if err := mc.DB.Raw(query, id).Scan(&points).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to fetch chart data")
	}

	return c.JSON(http.StatusOK, points)
}

func (mc *MonitorController) Delete(c echo.Context) error {
	id := c.Param("id")
	user, _ := c.Get("user").(userModels.User)

	result := mc.DB.Unscoped().Where("id = ? AND user_id = ?", id, user.ID).Delete(&monitorModels.Monitor{})
	if result.RowsAffected == 0 {
		return echo.NewHTTPError(http.StatusNotFound, "Monitor not found")
	}

	return c.NoContent(http.StatusNoContent)
}
