import { Request, Response, NextFunction } from "express";
import { ScheduleService } from "../services/scheduleService";
import { Users } from "../db/models/user";
import { IScheduleCreateInput } from "../interfaces/scheduleInput";

const ScheduleController = {
  getAllSchedule: async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   const { user_name, email, password, gender, age_range, job }: IUserInput = req.body;
      //   const newUser = await UserService.addUser({ user_name, email, password, gender, age_range, job });
      const pk_user_id: Users["pk_user_id"] = req.currentUserId;
      const result = await ScheduleService.getAllSchedule(pk_user_id);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const { type, start, finish, to_do }: IScheduleCreateInput = req.body;
      const newSchedule = await ScheduleService.addSchedule(fk_user_id, { type, start, finish, to_do });

      res.status(201).json(newSchedule);
    } catch (error) {
      next(error);
    }
  },
};

export { ScheduleController };
