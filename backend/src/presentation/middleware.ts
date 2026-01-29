import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.cookies?.role;

  if (role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};
