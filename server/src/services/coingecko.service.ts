import axios from 'axios';

const BASE_URL = process.env.COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3';

export const coingeckoService = {
  async getMarketChart(coinId: string, days: number) {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
      params: { vs_currency: 'usd', days },
      timeout: 10000
    });
    return response.data;
  },

  async getTopMovers() {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,dogecoin',   // 🔹 restrict to your 3 coins
        order: 'market_cap_desc',
        per_page: 3,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h'
        /* vs_currency: 'usd',
        order: 'price_change_percentage_24h_desc',
        per_page: 10,
        page: 1,
        sparkline: false */
      },
      timeout: 10000
    });
    return response.data;
  },

  async getPrices(ids: string) {
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids,
        vs_currencies: 'usd',
        include_24hr_change: true
      },
      timeout: 5000
    });
    return response.data;
  }
};
