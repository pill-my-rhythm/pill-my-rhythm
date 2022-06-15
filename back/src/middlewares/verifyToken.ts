import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers["authorization"]) {
      res.status(401).json({
        status: "fail",
        message: "token이 없습니다",
      });
    } else {
      const secretKey: string = process.env.JWT_SECRET_KEY;
      const userToken = req.headers["authorization"].split(" ")[1];
      const jwtDecoded: any = jwt.verify(userToken, secretKey);
      req.currentUserId = jwtDecoded.userId;
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "token이 변형되었습니다. ",
      error,
    });
    next(error);
  }
};

export { verifyToken };
