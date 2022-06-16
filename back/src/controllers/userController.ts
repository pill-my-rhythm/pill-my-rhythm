import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { Users } from "../db/models/user";
import { HttpException } from "../utils/error-util";
import { IUserInput, IUserLoginInput, IUserInfoUpdateInput } from "../interfaces/userInput";

const UserController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_name, email, password, gender, age_range, job }: IUserInput = req.body;
      const newUser = await UserService.addUser({ user_name, email, password, gender, age_range, job });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: IUserLoginInput = req.body;
      const user = await UserService.getUser(email, password);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pk_user_id = req.currentUserId;
      const result = await UserService.deleteToken(pk_user_id);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  updateInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pk_user_id: Users["pk_user_id"] = req.currentUserId;
      const { password, gender, age_range, job }: IUserInfoUpdateInput = req.body;
      const updateDate = { password, gender, age_range, job };

      const result = await UserService.updateUserInfo(pk_user_id, updateDate);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  withdrawal: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pk_user_id = req.currentUserId;
      const deletedUser = await UserService.delete(pk_user_id);

      res.status(201).json(deletedUser);
    } catch (error) {
      next(error);
    }
  },

  currentUserInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pk_user_id = req.currentUserId;
      const userInfo = await UserService.getUserInfo(pk_user_id);

      res.status(200).json(userInfo);
    } catch (error) {
      next(error);
    }
  },
};

export { UserController };
