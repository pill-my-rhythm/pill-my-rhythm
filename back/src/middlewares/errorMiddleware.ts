import { Request, Response, NextFunction } from "express";

function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error);
  res.json({
    status: res.statusCode,
    message: error.message,
  });
}

export { errorMiddleware };
