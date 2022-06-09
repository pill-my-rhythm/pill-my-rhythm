import { Router, Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { UserService } from "../services/userService";
import { Users } from "../db/models/user";
import { validatorErrorChecker } from "../middlewares/validator";
import { loginRequired } from "../middlewares/loginRequired";
import { IUserInput, IUserInfoUpdateInput } from "../interfaces/userInput";

const UserRouter = Router();

UserRouter.post(
  "/register",
  [
    check("user_name").exists(),
    check("email").exists().isEmail(),
    check("password").exists().isLength({ min: 8, max: 12 }),
    validatorErrorChecker,
  ],

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_name, email, password, gender, age_range, job }: IUserInput = req.body;
      const newUser = await UserService.addUser({ user_name, email, password, gender, age_range, job });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

UserRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await UserService.getUser(email, password);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

UserRouter.delete("/withdrawal", loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pk_user_id = req.currentUserId;
    const deletedUser = await UserService.delete(pk_user_id);

    res.status(201).json(deletedUser);
  } catch (error) {
    next(error);
  }
});

UserRouter.put("/updateInfo", loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pk_user_id: Users["pk_user_id"] = req.currentUserId;
    const { gender, age_range, job }: IUserInfoUpdateInput = req.body;
    const updateDate = { gender, age_range, job };

    const result = await UserService.updateUserInfo(pk_user_id, updateDate);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 로그인 전에 검증할지 로그인 후에 검증할지
// UserRouter.put("/changePassword", loginRequired, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const pk_user_id: string = req.currentUserId;
//     const newPassword: string = req.body.newPassword;

//     const result = await UserService.updatePassword(pk_user_id, newPassword);
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

export { UserRouter };
