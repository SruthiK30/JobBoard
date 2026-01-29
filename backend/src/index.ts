import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { Database } from './infrastructure/Database';
import { authMiddleware } from './presentation/middleware';
import jobRoutes from './presentation/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/* ================= CORS ================= */
app.use(cors({
  origin: 'https://job-board-lac-seven.vercel.app',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

/* ================= AUTH ================= */
app.post('/api/auth/set-role', (req, res) => {
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  res.cookie('role', role, {
    httpOnly: true,
    secure: true,      // ✅ MUST be true on HTTPS
    sameSite: 'none',  // ✅ MUST be none for Vercel ↔ Render
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: 'Role set', role });
});

app.get('/api/auth/role', (req, res) => {
  res.json({ role: req.cookies.role || null });
});

/* ================= ROUTES ================= */
app.use('/api/jobs', jobRoutes);        // public
app.use('/api', authMiddleware);        // protected

/* ================= START ================= */
async function start() {
  await Database.connect();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
