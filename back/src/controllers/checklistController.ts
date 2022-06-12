import { Request, Response, NextFunction } from "express";
import { ChecklistService } from "../services/checklistService";
import { IChecklistCreateInput } from "../interfaces/checklistInput";

const ChecklistController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const date: string = req.body.date.slice(0, 10);
      const { one, two, three, four, five, six }: IChecklistCreateInput = req.body;
      const newChecklist = await ChecklistService.addChecklist({ fk_user_id, date, one, two, three, four, five, six });

      res.status(201).json(newChecklist);
    } catch (error) {
      next(error);
    }
  },
};

export { ChecklistController };
