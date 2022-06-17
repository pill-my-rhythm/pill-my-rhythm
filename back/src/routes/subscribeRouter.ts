import { Router } from "express";
import { SubscribeController } from "../controllers/subscribeController";
import { check } from "express-validator";
import { validatorErrorChecker } from "../middlewares/validator";
import { verifyToken } from "../middlewares/verifyToken";

const SubscribeRouter = Router();

SubscribeRouter.use(verifyToken);

// 알림 서비스 구독
SubscribeRouter.post(
  "/create",
  [check("device_token").exists().isJSON(), validatorErrorChecker],
  SubscribeController.subscribeNotification,
);

export { SubscribeRouter };
