import { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/error-util";

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  console.log("\x1b[33m%s\x1b[0m", error);
  const status = error.status || 500;
  res.status(status).json({
    status: status,
    message: error.message,
  });
}

export { errorMiddleware };
