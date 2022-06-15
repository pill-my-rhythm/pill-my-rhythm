import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { makeToken } from "../utils/jwt-util";
import { verifyToken, verifyRefreshToken } from "../utils/jwt-util";

import dotenv from "dotenv";
dotenv.config();

const verifyRefresh = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers["authorization"] && req.headers["refresh"]) {
    const userToken = req.headers["authorization"].split(" ")[1];
    const refreshToken = req.headers["refresh"] as string;

    const authResult = verifyToken(userToken);
    const jwtDecoded: any = jwt.decode(userToken);
    const userId: string = jwtDecoded.userId;

    if (!jwtDecoded) {
      res.status(401).send({
        ok: false,
        message: "No authorized!",
      });
    }

    const refreshResult = await verifyRefreshToken(refreshToken, userId);

    if (authResult.ok === false && authResult.message === "jwt expired") {
      // 1. access token 만료 + refresh token 만료
      if (refreshResult === false) {
        res.status(401).send({
          ok: false,
          message: "No authorized! 다시 로그인해주세요.",
        });
      } else {
        // 2. access token이 만료 + refresh token은 만료 X
        const newAccessToken = makeToken({ userId: userId });

        res.status(200).send({
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      // 3. access token 만료 X -> refresh X
      res.status(400).send({
        ok: false,
        message: "Access token is not expired!",
      });
    }
  } else {
    res.status(400).send({
      ok: false,
      message: "Access token and refresh token are need for refresh!",
    });
  }
};

export { verifyRefresh };
