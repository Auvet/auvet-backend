import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import prisma from './config/database';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3000;
const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'https://auvet-frontendd.vercel.app',
  'https://auvet-frontend.onrender.com',
  'https://auvet-frontend.vercel.app',
];
const corsEnv = process.env['CORS_ORIGINS'] || process.env['CORS_ORIGIN'];
const envOrigins = (corsEnv ? corsEnv.split(',') : [])
  .map((origin) => origin.trim())
  .filter((origin) => origin.length > 0);
const allowedOrigins = Array.from(new Set([...DEFAULT_ALLOWED_ORIGINS, ...envOrigins]));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.header('Vary', 'Origin');

  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');

  const requestHeaders = req.headers['access-control-request-headers'];
  res.header(
    'Access-Control-Allow-Headers',
    typeof requestHeaders === 'string' && requestHeaders.length > 0
      ? requestHeaders
      : 'Content-Type, Authorization, X-Requested-With, Accept',
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

setupSwagger(app);

app.use('/api', routes);

app.get('/health', async(_req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    console.error('Erro na conexão com o banco:', error);
    res.status(500).json({ status: 'ERROR', database: 'Disconnected' });
  }
});

async function startServer(): Promise<void> {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}

startServer();
