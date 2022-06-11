import { Users } from "../../db/models/user";

declare global {
  namespace Express {
    interface Request {
      currentUserId?: Users["pk_user_id"];
    }
  }
}
