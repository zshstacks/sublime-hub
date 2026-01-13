package worker

import (
	"context"
	"log"
	"net/http"
	"sync"
	"time"

	models2 "github.com/zshstacks/markdown-zsh/modules/monitor/models"
	"gorm.io/gorm"
)

type MonitorWorker struct {
	DB         *gorm.DB
	MaxWorkers int
}

func NewMonitorWorker(db *gorm.DB) *MonitorWorker {
	return &MonitorWorker{
		DB:         db,
		MaxWorkers: 10,
	}
}

func (mw *MonitorWorker) Start(ctx context.Context) {
	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()

	log.Println("Monitor worker started...")

	for {
		select {
		case <-ctx.Done():
			log.Println("Monitor worker shutting down...")
			return
		case <-ticker.C:
			mw.processPendingMonitors()
		}
	}
}

func (mw *MonitorWorker) processPendingMonitors() {
	var pendingMonitors []models2.Monitor

	err := mw.DB.Where(
		"is_active = ? AND (last_checked_at IS NULL OR last_checked_at + (interval * interval '1 second') < NOW())",
		true,
	).Find(&pendingMonitors).Error

	if err != nil {
		log.Printf("❌ Error fetching pending monitors: %v", err)
		return
	}

	if len(pendingMonitors) == 0 {
		return
	}

	log.Printf("🔍 Found %d monitors to check", len(pendingMonitors))

	guard := make(chan struct{}, mw.MaxWorkers)
	var wg sync.WaitGroup

	for _, m := range pendingMonitors {
		wg.Add(1)
		guard <- struct{}{} // block if worker limit

		go func(monitor models2.Monitor) {
			defer wg.Done()
			mw.checkMonitor(monitor)
			<-guard // clear space for the next worker
		}(m)
	}

	wg.Wait()
}

func (mw *MonitorWorker) checkMonitor(monitor models2.Monitor) {
	start := time.Now()

	client := &http.Client{
		Timeout: time.Duration(monitor.Timeout) * time.Second,
	}

	req, err := http.NewRequest("GET", monitor.URL, nil)
	if err != nil {
		log.Printf("❌ Failed to create request for %s: %v", monitor.URL, err)
		return
	}
	req.Header.Set("User-Agent", "UptimeMonitor-Worker/1.0 (Golang)")

	resp, err := client.Do(req)

	latency := time.Since(start).Milliseconds()
	statusCode := 0
	errMsg := ""

	if err != nil {
		errMsg = err.Error()
		log.Printf("⚠️ Monitor %s failed: %v", monitor.Name, err)
	} else {
		statusCode = resp.StatusCode
		resp.Body.Close()
	}

	heartbeat := models2.Heartbeat{
		MonitorID:    monitor.ID,
		Latency:      latency,
		StatusCode:   statusCode,
		ErrorMessage: errMsg,
	}
	mw.DB.Create(&heartbeat)

	newStatus := "up"
	if err != nil || statusCode < 200 || statusCode >= 300 {
		newStatus = "down"
	}

	mw.DB.Model(&models2.Monitor{}).Where("id = ?", monitor.ID).Updates(map[string]interface{}{
		"last_checked_at": time.Now(),
		"status":          newStatus,
	})

	log.Printf("✅ Checked %s: %s (%dms)", monitor.Name, newStatus, latency)
}
