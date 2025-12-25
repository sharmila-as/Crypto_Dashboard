export interface MarketChartResponse {
  prices: [number, number][];
  total_volumes: [number, number][];
}

export interface TopMoversResponse {
  gainer: Coin;
  loser: Coin;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}
