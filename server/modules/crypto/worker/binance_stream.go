package worker

import (
	"context"
	"encoding/json"
	"log"

	"github.com/coder/websocket"
	"github.com/coder/websocket/wsjson"
)

func StartBinanceStream(ctx context.Context, broadcast chan []byte) {
	url := "wss://stream.binance.com:9443/ws/!ticker@arr"

	for {
		select {
		case <-ctx.Done():
			return
		default:
			conn, _, err := websocket.Dial(ctx, url, nil)
			if err != nil {
				log.Printf("Binance WS Dial error: %v", err)
				continue
			}

			conn.SetReadLimit(512 * 1024)

			for {
				var msg interface{}

				err := wsjson.Read(ctx, conn, &msg)
				if err != nil {
					log.Printf("Binance WS Read error: %v", err)
					break
				}

				data, _ := json.Marshal(msg)
				broadcast <- data
			}
			conn.Close(websocket.StatusNormalClosure, "")
		}
	}
}
