import { Request, Response, NextFunction } from "express";
import { SubscribeService } from "../services/subscribeService";

const SubscribeController = {
  subscribeNotification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const device_token: JSON = req.body.device_token;

      const subscription = await SubscribeService.createSubscription(fk_user_id, device_token);
      return subscription;
    } catch (error) {
      next(error);
    }
  },
};

export { SubscribeController };
