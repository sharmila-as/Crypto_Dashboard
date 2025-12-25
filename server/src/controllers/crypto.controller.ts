import type { Request, Response } from 'express';
import { coingeckoService } from '../services/coingecko.service';

export const getMarketChart = async (req: Request, res: Response) => {
  try {
    const { coinId, days = '7' } = req.query;

    if (!coinId || typeof coinId !== 'string') {
      return res.status(400).json({ error: 'coinId is required' });
    }

    const data = await coingeckoService.getMarketChart(coinId, Number(days));
    res.json(data);
  } catch (error) {
    console.error('Market chart error:', error);
    res.status(500).json({ error: 'Failed to fetch market chart data' });
  }
};

/* export const getTopMovers = async (req: Request, res: Response) => {
  try {
    const data = await coingeckoService.getTopMovers();
    const sorted = data.sort((a: any, b: any) => 
      (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0)
    );

    res.json({
      topGainers: sorted.slice(0, 5),
      topLosers: sorted.slice(-5).reverse()
    });
  } catch (error) {
    console.error('Top movers error:', error);
    res.status(500).json({ error: 'Failed to fetch top movers' });
  }
};
 */

export const getTopMovers = async (_req: Request, res: Response) => {
  try {
    const data = await coingeckoService.getTopMovers();

    const sorted = data.sort(
      (a: any, b: any) =>
        (b.price_change_percentage_24h || 0) -
        (a.price_change_percentage_24h || 0)
    );

    // 🔹 Single best gainer & loser
    const gainer = sorted[0];
    const loser = sorted[sorted.length - 1];

    res.json({ gainer, loser });
  } catch (error) {
    console.error('Top movers error:', error);
    res.status(500).json({ error: 'Failed to fetch top movers' });
  }
};


export const getPrices = async (req: Request, res: Response) => {
  try {
    const { ids = 'bitcoin,ethereum,dogecoin' } = req.query;
    const data = await coingeckoService.getPrices(String(ids));
    res.json(data);
  } catch (error) {
    console.error('Prices error:', error);
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
};
