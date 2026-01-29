import { Request, Response, NextFunction } from 'express';
import { Role } from '../domain/Job';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const role = req.cookies.role as Role | undefined;
  const userId = req.cookies.userId as string | undefined;

  if (!role || !['user', 'admin'].includes(role)) {
    res.status(401).json({ error: 'Unauthorized: Invalid or missing role' });
    return;
  }

  req.role = role;
  req.userId = userId || 'guest';
  next();
}

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden: Admin access required' });
    return;
  }
  next();
}
