import jwt from "jsonwebtoken";
import { ITokenInput } from "../interfaces/userInput";
import { getErrorMessage } from "./error-util";

import dotenv from "dotenv";
dotenv.config();
const secretKey: any = process.env.JWT_SECRET_KEY;

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

export { makeChecklistToken, makeResubscribeToken, verifyToken };
