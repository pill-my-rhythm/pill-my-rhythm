import { Request, Response, NextFunction } from "express";
import { ScheduleService } from "../services/scheduleService";
import { IScheduleCreateInput } from "../interfaces/scheduleInput";

const ScheduleController = {
  getWeeklySchedule: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const start: Date = new Date(req.body.start);
      const finish: Date = new Date(req.body.finish);
      const result = await ScheduleService.getWeeklySchedule(fk_user_id, { start, finish });
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
  createDailySupplement: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const type: string = req.body.type;
      const fk_supplement_id: number = req.body.fk_supplement_id;
      const newSchedule = await ScheduleService.addDailySupplement({ fk_user_id, fk_supplement_id, type });

      res.status(201).json(newSchedule);
    } catch (error) {
      next(error);
    }
  },
};

export { ScheduleController };
