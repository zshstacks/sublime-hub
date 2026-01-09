package worker

import (
	"log"
	"net/http"
	"time"

	models2 "github.com/zshstacks/markdown-zsh/modules/monitor/models"
	"gorm.io/gorm"
)

type MonitorWorker struct {
	DB *gorm.DB
}

func NewMonitorWorker(db *gorm.DB) *MonitorWorker {
	return &MonitorWorker{DB: db}
}

func (mw *MonitorWorker) Start() {
	ticker := time.NewTicker(10 * time.Second)

	log.Println("Monitor worker started...")

	for range ticker.C {
		mw.proccesPendingMonitors()
	}
}

func (mw *MonitorWorker) proccesPendingMonitors() {
	var pendingMonitors []models2.Monitor

	//now := time.Now()

	err := mw.DB.Where(
		"is_active = ? AND (last_checked_at IS NULL OR last_checked_at + (interval * interval '1 second') < NOW())",
		true,
	).Find(&pendingMonitors).Error
	if err != nil {
		log.Printf("❌ Error fetching pending monitors: %v", err)
		return
	}

	if len(pendingMonitors) > 0 {
		log.Printf("🔍 Found %d monitors to check", len(pendingMonitors))
	}

	for _, monitor := range pendingMonitors {
		log.Printf("🚀 Starting check for: %s (%s)", monitor.Name, monitor.URL)
		go mw.checkMonitor(monitor)
	}
}

func (mw *MonitorWorker) checkMonitor(monitor models2.Monitor) {
	start := time.Now()

	client := http.Client{
		Timeout: time.Duration(monitor.Timeout) * time.Second,
	}

	resp, err := client.Get(monitor.URL)

	latency := time.Since(start).Milliseconds()
	statusCode := 0
	errMsg := ""

	if err != nil {
		errMsg = err.Error()
		log.Printf("Monitor %s failed: %v", monitor.Name, err)
	} else {
		statusCode = resp.StatusCode
		resp.Body.Close()
	}

	//save the heartbeat history
	heartbeat := models2.Heartbeat{
		MonitorID:    monitor.ID,
		Latency:      latency,
		StatusCode:   statusCode,
		ErrorMessage: errMsg,
	}

	mw.DB.Create(&heartbeat)

	//refresh the monitor main status
	newStatus := "up"
	if statusCode < 200 || statusCode >= 300 {
		newStatus = "down"
	}

	mw.DB.Model(&monitor).Updates(map[string]interface{}{
		"last_checked_at": time.Now(),
		"status":          newStatus,
	})

}
