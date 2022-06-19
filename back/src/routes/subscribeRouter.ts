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
  // [check("device_token").exists().isJSON(), validatorErrorChecker],
  [check("device_token").exists(), validatorErrorChecker],
  SubscribeController.subscribeNotification,
);

// 알림 서비스 구독
SubscribeRouter.post(
  "/delete",
  // [check("device_token").exists().isJSON(), validatorErrorChecker],
  [check("device_token").exists(), validatorErrorChecker],
  SubscribeController.unsubscribe,
);

// 사용자별 푸시 알림 테스트
SubscribeRouter.get("/push-test", SubscribeController.pushNotification);

export { SubscribeRouter };
