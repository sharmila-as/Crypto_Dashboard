import { Router } from 'express';
import { getMarketChart, getTopMovers, getPrices } from '../controllers/crypto.controller';

const router = Router();

router.get('/prices', getPrices);
router.get('/market-chart', getMarketChart);
router.get('/top-movers', getTopMovers);

export default router;
