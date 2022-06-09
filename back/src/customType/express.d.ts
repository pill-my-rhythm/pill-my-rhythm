import { Users } from "../db/models/user";

declare global {
  namespace Express {
    interface Request {
      currentUserId?: string | null;
    }
  }
}
