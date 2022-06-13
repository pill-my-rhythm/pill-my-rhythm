import { Request, Response, NextFunction } from "express";
import { ChecklistService } from "../services/checklistService";
import { IChecklistCreateInput, IChecklistWeeklyInput } from "../interfaces/checklistInput";

const ChecklistController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const { date, one, two, three, four, five, six }: IChecklistCreateInput = req.body;
      const newChecklist = await ChecklistService.addChecklist({ fk_user_id, date, one, two, three, four, five, six });

      res.status(201).json(newChecklist);
    } catch (error) {
      next(error);
    }
  },

  getWeekly: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const { start, finish }: IChecklistWeeklyInput = req.body;
      const weeklyChecklist = await ChecklistService.getWeeklyChecklist(fk_user_id, { start, finish });

      res.status(200).json(weeklyChecklist);
    } catch (error) {
      next(error);
    }
  },
};

export { ChecklistController };
