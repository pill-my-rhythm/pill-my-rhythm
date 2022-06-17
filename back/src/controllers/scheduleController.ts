import { Request, Response, NextFunction } from "express";
import { ScheduleService } from "../services/scheduleService";
import { IScheduleCreateInput } from "../interfaces/scheduleInput";

const ScheduleController = {
  getWeeklySchedule: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const s: string = req.query.start as string;
      const f: string = req.query.finish as string;
      const start: Date = new Date(s);
      const finish: Date = new Date(f);
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
      const dailySupplement = await ScheduleService.addDailySupplement({ fk_user_id, fk_supplement_id, type });

      res.status(201).json(dailySupplement);
    } catch (error) {
      next(error);
    }
  },
  deleteDailySupplement: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const pk_plan_id = Number(req.params.plan_id);
      const deletedDailySupplement = await ScheduleService.deleteDailySupplement(fk_user_id, pk_plan_id);

      res.status(201).json(deletedDailySupplement);
    } catch (error) {
      next(error);
    }
  },
};

export { ScheduleController };
