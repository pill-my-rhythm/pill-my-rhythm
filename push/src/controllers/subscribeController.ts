import { Request, Response, NextFunction } from "express";
import { SubscribeService } from "../services/subscribeService";

const SubscribeController = {
  pushSupplements: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const strtime: any = req.query.time;
      const time: Date = new Date(strtime);

      const supplementSchedules =
        await SubscribeService.pushSupplementSchedules(time);
      res.status(200).json(supplementSchedules);
    } catch (error) {
      next(error);
    }
  },
};

export { SubscribeController };
