import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { Database } from './infrastructure/Database';
import jobRoutes from './presentation/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
  origin: 'https://job-board-lac-seven.vercel.app',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ================= AUTH =================
app.post('/api/auth/set-role', (req, res) => {
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  res.cookie('role', role, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ message: 'Role set', role });
});

app.get('/api/auth/role', (req, res) => {
  res.json({ role: req.cookies.role || null });
});

// ================= JOB ROUTES =================
console.log('✅ Mounting /api/jobs routes');
app.use('/api/jobs', jobRoutes);

// ================= START SERVER =================
async function start() {
  try {
    await Database.connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
