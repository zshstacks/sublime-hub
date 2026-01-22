import { useState, useEffect, useRef } from "react";
import { Coin, BinanceTicker } from "../types";

export const useCryptoWebSocket = (initialCoins: Coin[]) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;

  // Format market cap to readable string
  const formatMarketCap = (cap: number | undefined): string => {
    if (!cap) return "---";

    if (cap >= 1_000_000_000_000) {
      return `$${(cap / 1_000_000_000_000).toFixed(2)}T`;
    } else if (cap >= 1_000_000_000) {
      return `$${(cap / 1_000_000_000).toFixed(2)}B`;
    } else if (cap >= 1_000_000) {
      return `$${(cap / 1_000_000).toFixed(2)}M`;
    } else if (cap >= 1_000) {
      return `$${(cap / 1_000).toFixed(2)}K`;
    }
    return `$${cap.toFixed(2)}`;
  };

  useEffect(() => {
    const formattedCoins = initialCoins.map((coin) => ({
      ...coin,
      cap: formatMarketCap(coin.marketCap),
    }));
    setCoins(formattedCoins);
  }, [initialCoins]);

  useEffect(() => {
    if (initialCoins.length === 0) return;

    const connectWebSocket = () => {
      if (socketRef.current) {
        socketRef.current.close();
      }

      const socket = new WebSocket("ws://localhost:8000/api/crypto/ws");
      socketRef.current = socket;

      socket.onopen = () => {
        // console.log(" WebSocket connected");
        reconnectAttemptsRef.current = 0;
      };

      socket.onmessage = (event) => {
        try {
          const tickers: BinanceTicker[] = JSON.parse(event.data);

          setCoins((currentCoins) =>
            currentCoins.map((coin) => {
              const searchSymbol = coin.symbol.endsWith("USDT")
                ? coin.symbol
                : `${coin.symbol}USDT`;

              const ticker = tickers.find((t) => t.s === searchSymbol);

              if (ticker) {
                const newPrice = parseFloat(ticker.c);
                const priceChange = parseFloat(ticker.P);

                const oldPrice = coin.price
                  ? parseFloat(coin.price.replace(/[$,]/g, ""))
                  : null;

                if (
                  oldPrice !== null &&
                  Math.abs(oldPrice - newPrice) < 0.000001
                ) {
                  return coin;
                }

                const formattedPrice = newPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                });

                const formattedChange = `${priceChange >= 0 ? "+" : ""}${priceChange.toFixed(2)}%`;

                return {
                  ...coin,
                  price: formattedPrice,
                  h24: formattedChange,

                  cap: coin.cap || formatMarketCap(coin.marketCap),
                };
              }
              return coin;
            }),
          );
        } catch (err) {
          // console.error("Error processing WebSocket message:", err);
        }
      };

      socket.onerror = (error) => {
        if (socket.readyState !== WebSocket.CLOSED) {
          // console.error("WebSocket error:", error);
        }
      };

      socket.onclose = (event) => {
        // console.log("WebSocket closed:", event.code, event.reason);

        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current += 1;
          const delay = Math.min(
            1000 * Math.pow(2, reconnectAttemptsRef.current),
            30000,
          );

          // console.log(
          //   `Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current})`,
          // );

          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, delay);
        }
      };
    };

    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (socketRef.current) {
        socketRef.current.onclose = null;
        socketRef.current.close(1000, "Component unmounted");
        socketRef.current = null;
      }
    };
  }, [initialCoins.length]);

  return coins;
};
