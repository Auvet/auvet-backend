import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import prisma from './config/database';

dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3000;

app.use(express.json());
app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'AUVET Backend is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      funcionarios: '/api/funcionarios'
    }
  });
});

app.get('/health', async (_req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.json({
      status: 'OK',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      database: 'Disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

async function startServer(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('Database connection established');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env['NODE_ENV']}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}

startServer();
