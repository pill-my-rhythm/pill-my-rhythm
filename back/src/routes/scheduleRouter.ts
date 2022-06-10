import { Router } from "express";
import { ScheduleController } from "../controllers/scheduleController";
import { loginRequired } from "../middlewares/loginRequired";

const ScheduleRouter = Router();

// 전체 스케줄 조회
ScheduleRouter.get("/", loginRequired, ScheduleController.getAllSchedule);

export { ScheduleRouter };
