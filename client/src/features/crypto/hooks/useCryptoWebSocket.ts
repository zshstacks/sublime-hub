import { useState, useEffect, useRef } from "react";
import { Coin, BinanceTicker } from "../types";

let globalSocket: WebSocket | null = null;
const listeners = new Set<(tickers: BinanceTicker[]) => void>();

export const useCryptoWebSocket = (initialCoins: Coin[]) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  // const isCleaningUp = useRef(false);

  const formatMarketCap = (cap: number | undefined): string => {
    if (!cap) return "---";
    if (cap >= 1_000_000_000_000)
      return `$${(cap / 1_000_000_000_000).toFixed(2)}T`;
    if (cap >= 1_000_000_000) return `$${(cap / 1_000_000_000).toFixed(2)}B`;
    return `$${(cap / 1_000_000).toFixed(2)}M`;
  };

  useEffect(() => {
    setCoins(
      initialCoins.map((c) => ({ ...c, cap: formatMarketCap(c.marketCap) })),
    );
  }, [initialCoins]);

  useEffect(() => {
    if (initialCoins.length === 0) return;

    const handleMessage = (tickers: BinanceTicker[]) => {
      setCoins((currentCoins) =>
        currentCoins.map((coin) => {
          const searchSymbol = coin.symbol.endsWith("USDT")
            ? coin.symbol
            : `${coin.symbol}USDT`;
          const ticker = tickers.find((t) => t.s === searchSymbol);

          if (ticker) {
            return {
              ...coin,
              price: parseFloat(ticker.c).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              }),
              h24: `${parseFloat(ticker.P) >= 0 ? "+" : ""}${parseFloat(ticker.P).toFixed(2)}%`,
            };
          }
          return coin;
        }),
      );
    };

    listeners.add(handleMessage);

    if (!globalSocket || globalSocket.readyState === WebSocket.CLOSED) {
      globalSocket = new WebSocket("ws://localhost:8000/api/crypto/ws");

      globalSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          listeners.forEach((listener) => listener(data));
        } catch (e) {}
      };

      globalSocket.onclose = () => {
        globalSocket = null;
      };
    }

    return () => {
      listeners.delete(handleMessage);

      if (listeners.size === 0 && globalSocket) {
        globalSocket.close();
        globalSocket = null;
      }
    };
  }, [initialCoins.length]);

  return coins;
};
