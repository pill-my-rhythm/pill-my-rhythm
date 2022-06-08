import { Request, Response, NextFunction } from "express";

function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", err);
  res.status(500).json({ message: err.message });
}

export { errorMiddleware };
