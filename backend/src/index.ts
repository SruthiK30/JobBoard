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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-board';

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Set role route (for initial screen)
app.post('/api/auth/set-role', (req: Request, res: Response) => {
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    res.status(400).json({ error: 'Invalid role' });
    return;
  }

  res.cookie('role', role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ message: 'Role set successfully', role });
});

// Get current role
app.get('/api/auth/role', (req: Request, res: Response) => {
  const role = req.cookies.role;
  res.json({ role: role || null });
});

// Protected routes
app.use('/api', authMiddleware, jobRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function start() {
  try {
    await Database.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
