import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { Database } from './infrastructure/Database';
import { authMiddleware } from './presentation/middleware';
import jobRoutes from './presentation/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://job-board.vercel.app'
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Auth routes
app.post('/api/auth/set-role', (req: Request, res: Response) => {
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  res.cookie('role', role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: 'Role set successfully', role });
});

app.get('/api/auth/role', (req: Request, res: Response) => {
  res.json({ role: req.cookies.role || null });
});

// ✅ PUBLIC jobs
app.use('/api/jobs', jobRoutes);

// ✅ PROTECTED routes
app.use('/api', authMiddleware);

// Start server
async function start() {
  try {
    await Database.connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
