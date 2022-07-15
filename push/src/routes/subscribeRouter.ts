import { Router } from "express";
import { SubscribeController } from "../controllers/subscribeController";

const SubscribeRouter = Router();

// 하루 영양제 정보 푸시 알림
SubscribeRouter.get("/push-supplements", SubscribeController.pushSupplements);

export { SubscribeRouter };
