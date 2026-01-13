package models

import "time"

type ChartPoint struct {
	Timestamp time.Time `json:"timestamp"`
	Latency   float64   `json:"latency"`
	Uptime    float64   `json:"uptime"`
}
