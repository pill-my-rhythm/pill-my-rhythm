import { Router, Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";
import { IUserInput } from "../interfaces/userInput";

const userRouter = Router();

userRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_name, email, password, gender, age_range, job }: IUserInput = req.body;
    const newUser = await userService.addUser({ user_name, email, password, gender, age_range, job });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});
// userRouter.delete("/user/withdrawal", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     req.user_id = pk_user_id;
//     const result = await userService.deleteUser({pk_user_id });

//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

export { userRouter };
