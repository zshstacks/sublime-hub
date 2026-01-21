// modules/crypto/price_hub.go

package crypto

import (
	"context"
	"sync"
	"time"

	"github.com/coder/websocket" // Pārliecinies, ka šī pakotne sakrīt ar kontroliera pakotni!
)

type PriceHub struct {
	clients    map[*websocket.Conn]struct{}
	register   chan *websocket.Conn
	unregister chan *websocket.Conn
	mu         sync.RWMutex
	Broadcast  chan []byte
}

func NewPriceHub() *PriceHub {
	return &PriceHub{
		clients:    make(map[*websocket.Conn]struct{}),
		register:   make(chan *websocket.Conn),
		unregister: make(chan *websocket.Conn),
		Broadcast:  make(chan []byte, 100),
	}
}

func (h *PriceHub) AddClient(conn *websocket.Conn) {
	h.register <- conn
}

func (h *PriceHub) RemoveClient(conn *websocket.Conn) {
	h.unregister <- conn
}

func (h *PriceHub) Run(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case conn := <-h.register:
			h.mu.Lock()
			h.clients[conn] = struct{}{}
			h.mu.Unlock()
		case conn := <-h.unregister:
			h.mu.Lock()
			delete(h.clients, conn)
			h.mu.Unlock()
		case msg := <-h.Broadcast:
			h.mu.RLock()
			for client := range h.clients {

				go func(c *websocket.Conn, m []byte) {
					writeCtx, cancel := context.WithTimeout(context.Background(), time.Second*3)
					defer cancel()
					c.Write(writeCtx, websocket.MessageText, m)
				}(client, msg)
			}
			h.mu.RUnlock()
		}
	}
}
