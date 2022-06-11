import { Router } from "express";
import { userController } from "../controllers/userController";
import { check } from "express-validator";
import { validatorErrorChecker } from "../middlewares/validator";
import { loginRequired } from "../middlewares/loginRequired";

const UserRouter = Router();

// 회원가입
UserRouter.post(
  "/register",
  [
    check("user_name").exists(),
    check("email").exists().isEmail(),
    check("password").exists().isLength({ min: 8, max: 12 }),
    validatorErrorChecker,
  ],
  userController.register,
);

// 로그인
UserRouter.post(
  "/login",
  [check("email").exists().isEmail(), check("password").exists().isLength({ min: 8, max: 12 }), validatorErrorChecker],
  userController.login,
);

// 회원 정보 수정
UserRouter.put("/updateInfo", loginRequired, userController.updateInfo);

// 회원 탈퇴
UserRouter.delete("/withdrawal", loginRequired, userController.withdrawal);

export { UserRouter };
