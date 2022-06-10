import { Request, Response, NextFunction } from "express";
import { ScheduleService } from "../services/scheduleService";
import { IScheduleCreateInput } from "../interfaces/scheduleInput";

const ScheduleController = {
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
