package worker

// this is the main structure returned by the Binance API
type BinanceExchangeInfo struct {
	Symbols []BinanceSymbol `json:"symbols"`
}

// describes one trading pair (example: BTCUSDT)
type BinanceSymbol struct {
	Symbol     string `json:"symbol"`     // "BTCUSDT"
	Status     string `json:"status"`     // "TRADING"
	BaseAsset  string `json:"baseAsset"`  // "BTC"
	QuoteAsset string `json:"quoteAsset"` // "USDT"
}
