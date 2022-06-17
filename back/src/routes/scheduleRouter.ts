import { Router } from "express";
import { ScheduleController } from "../controllers/scheduleController";
import { check } from "express-validator";
import { validatorErrorChecker } from "../middlewares/validator";
import { verifyToken } from "../middlewares/verifyToken";

const ScheduleRouter = Router();

ScheduleRouter.use(verifyToken);

// 전체 스케줄 조회
ScheduleRouter.get("/", ScheduleController.getWeeklySchedule);

// 생체 리듬, 스케줄 추가
ScheduleRouter.post(
  "/create",
  [
    check("type").exists().isIn(["B", "S"]),
    check("start").exists().isISO8601(),
    check("finish").exists().isISO8601(),
    check("to_do").exists(),
    validatorErrorChecker,
  ],
  ScheduleController.create,
);

// Daily Supplement 등록
ScheduleRouter.post("/daily-supplement", ScheduleController.createDailySupplement);

export { ScheduleRouter };
