import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import prisma from './config/database';

dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3000;

app.use(express.json());
app.use('/api', routes);

app.get('/health', async (_req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
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
