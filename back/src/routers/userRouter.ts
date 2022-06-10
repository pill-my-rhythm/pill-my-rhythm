import { Router, Request, Response, NextFunction } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { UserService } from "../services/userService";
import { IUserInput, IUserInfoUpdateInput } from "../interfaces/userInput";
import { Users } from "../db/models/user";

const UserRouter = Router();

UserRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_name, email, password, gender, age_range, job }: IUserInput = req.body;
    const newUser = await UserService.addUser({ user_name, email, password, gender, age_range, job });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

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

UserRouter.put("/updateInfo", loginRequired, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pk_user_id: Users["pk_user_id"] = req.currentUserId;
    const { password, gender, age_range, job }: IUserInfoUpdateInput = req.body;
    const updateDate = { password, gender, age_range, job };

    const result = await UserService.updateUserInfo(pk_user_id, updateDate);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { UserRouter };
