package models

import "gorm.io/gorm"

type Heartbeat struct {
	gorm.Model
	MonitorID    uint   `json:"monitor_id"`
	Latency      int64  `json:"latency"`
	StatusCode   int    `json:"status_code"`
	ErrorMessage string `json:"error_message"`
}
