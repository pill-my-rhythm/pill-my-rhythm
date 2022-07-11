import { Request, Response, NextFunction } from "express";
import moment from "moment";
import "moment-timezone";
// import { logger } from "../utils/winston";
import { HttpException } from "../utils/error-util";

moment.tz.setDefault("Asia/Seoul"); // 로그 시간대 한국 기준으로 변경

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("\x1b[33m%s\x1b[0m", error);
  const status = error.status || 500;

  // 배포시에만 log 남김
  // if (process.env.NODE_ENV === "production") {
  //   const errObj = {
  //     req: {
  //       headers: req.headers,
  //       query: req.query,
  //       body: req.body,
  //       route: req.route,
  //     },
  //     error: {
  //       message: error.message,
  //       stack: error.stack,
  //       status: error.status,
  //     },
  //     user: req.currentUserId,
  //   };
  //   logger.error(`${moment().format("YYYY-MM-DD HH:mm:ss")}`, errObj);
  // }

  res.status(status).json({
    message: error.message,
  });
};

export { errorMiddleware };
