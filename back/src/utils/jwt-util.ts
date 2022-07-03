import jwt from "jsonwebtoken";
import redisClient from "./redis";
import { ITokenInput } from "../interfaces/userInput";
import { getErrorMessage } from "./error-util";

import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

// access token 발급
const makeToken = (Object: ITokenInput) => {
  const token = jwt.sign(Object, secretKey, { expiresIn: "1h" });
  return token;
};

// refresh token 발급
const makeRefreshToken = () => {
  const refreshToken = jwt.sign({}, secretKey, {
    // refresh token은 payload 없이 발급
    algorithm: "HS256",
    expiresIn: "14d",
  });
  return refreshToken;
};

// checklist용 access token 발급
const makeChecklistToken = (Object: ITokenInput) => {
  const token = jwt.sign(Object, secretKey, { expiresIn: "1d" });
  return token;
};

// 구독 갱신용 access token 발급
const makeResubscribeToken = (Object: ITokenInput) => {
  const token = jwt.sign(Object, secretKey, { expiresIn: "3d" });
  return token;
};

// access token 유효성 검사
const verifyToken = (token: string) => {
  try {
    const jwtDecoded: any = jwt.verify(token, secretKey);
    return {
      ok: true,
      status: "success",
      userId: jwtDecoded.userId,
    };
  } catch (error) {
    return {
      ok: false,
      status: "fail",
      message: getErrorMessage(error),
    };
  }
};

// refresh token 유효성 검사
const verifyRefreshToken = async (token: string, userId: string) => {
  try {
    // redis db에서 refresh token 가져오기
    const getRefreshToken = await redisClient.get(userId);
    if (token === getRefreshToken) {
      try {
        jwt.verify(token, secretKey);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export { makeToken, makeRefreshToken, makeChecklistToken, makeResubscribeToken, verifyToken, verifyRefreshToken };
