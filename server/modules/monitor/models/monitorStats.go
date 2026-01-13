package models

type MonitorStats struct {
	UptimePercentage float64 `json:"uptime_percentage"`
	AverageLatency   float64 `json:"average_latency"`
	TotalChecks      int64   `json:"total_checks"`
}
