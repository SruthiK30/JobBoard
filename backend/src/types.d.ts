import { Request } from "express";

declare module 'cors';
declare module 'cookie-parser';

// Extend Express Request so TypeScript stops throwing errors
export interface AuthenticatedRequest extends Request {
    user?: any;
    body?: any;
    params?: any;
    query?: any;
    cookies?: any;
}
