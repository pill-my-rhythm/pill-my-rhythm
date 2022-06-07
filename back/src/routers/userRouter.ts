import { Router } from "express";
import { UserService } from "../services/userService";

const UserRouter = Router();

UserRouter.post("/login", async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await UserService.getUser({ email, password });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export { UserRouter };
