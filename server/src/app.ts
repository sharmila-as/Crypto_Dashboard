import express from 'express';
import cors from 'cors';
import cryptoRoutes from './routes/crypto.routes.js';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// DevTools endpoint (silences Chrome warnings)
app.get('/.well-known/appspecific/com.chrome.devtools.json', (_, res) => res.json({}));

// Health check
app.get('/api/health', (_, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api', cryptoRoutes);

// 404 handler
app.use('*', (_, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
