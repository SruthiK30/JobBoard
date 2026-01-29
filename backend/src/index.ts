import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { Database } from './infrastructure/Database';
import { authMiddleware } from './presentation/middleware';
import jobRoutes from './presentation/routes';

dotenv.config();

const app = express();
const allowedOrigin = 'https://job-board-lac-seven.vercel.app';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

const PORT = process.env.PORT || 4000;


/* =======================
   ✅ Middlewares
   ======================= */
app.use(express.json());
app.use(cookieParser());

/* =======================
   🔐 AUTH ROUTES
   ======================= */
app.post('/api/auth/set-role', (req: Request, res: Response) => {
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  res.cookie('role', role, {
    httpOnly: true,
    secure: true,        // REQUIRED for HTTPS
    sameSite: 'none',    // REQUIRED for cross-site
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: 'Role set successfully', role });
});

app.get('/api/auth/role', (req: Request, res: Response) => {
  res.json({ role: req.cookies.role || null });
});

/* =======================
   📦 PUBLIC ROUTES
   ======================= */
app.use('/api/jobs', jobRoutes);

/* =======================
   🔒 PROTECTED ROUTES
   ======================= */
app.use('/api', authMiddleware);

/* =======================
   🚀 START SERVER
   ======================= */
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
