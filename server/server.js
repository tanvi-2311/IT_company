import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import developerRoutes from './routes/developerRoutes.js';
import supabase from './config/supabase.js';

// Load environmental config
dotenv.config();

const app = express();

// Middleware integrations
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Enable dynamic CORS for all frontend client ports
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// HTTP logger in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Vedanco Corporate Backend Server'
  });
});

// Register api endpoints
app.use('/api', contactRoutes);
app.use('/api/developers', developerRoutes);

// Fallback 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found.'
  });
});

// Centralized error handler middleware
app.use((err, req, res, next) => {
  console.error('🔥 Global Exception caught:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server up and running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
