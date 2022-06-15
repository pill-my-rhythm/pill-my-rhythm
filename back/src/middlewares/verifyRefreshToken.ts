import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../db/User";
import { makeToken } from "../utils/jwt-util";
import { verifyToken, verifyRefreshToken } from "../utils/jwt-util";

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
    const user = await User.findByUserId(userId);
    if (!user) {
      throw new Error("가입 내역이 없는 계정입니다. 다시 한 번 확인해 주세요.");
    }
    const refreshResult = await verifyRefreshToken(refreshToken, userId);

    if (authResult.ok === false) {
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
    next();
  } else {
    res.status(400).send({
      ok: false,
      message: "Access token and refresh token are need for refresh!",
    });
  }
  next();
};

export { verifyRefresh };
