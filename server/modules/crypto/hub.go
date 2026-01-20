package crypto

import (
	"context"
	"sync"

	"github.com/coder/websocket"
)

type PriceHub struct {
	clients   map[*websocket.Conn]struct{}
	mu        sync.RWMutex
	Broadcast chan []byte
}

func NewPriceHub() *PriceHub {
	return &PriceHub{
		clients:   make(map[*websocket.Conn]struct{}),
		Broadcast: make(chan []byte, 100),
	}
}

func (h *PriceHub) AddClient(conn *websocket.Conn) {
	h.mu.Lock()
	h.clients[conn] = struct{}{}
	h.mu.Unlock()
}

func (h *PriceHub) Run(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case msg := <-h.Broadcast:
			h.mu.RLock()
			for client := range h.clients {

				client.Write(ctx, websocket.MessageText, msg)
			}
			h.mu.RUnlock()
		}
	}
}
