import { Role } from "./domain/Job";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    role?: Role;
  }
}

declare module "cors";
declare module "cookie-parser";
