import { Router } from "express";
import { ScheduleController } from "../controllers/scheduleController";
import { check } from "express-validator";
import { validatorErrorChecker } from "../middlewares/validator";
import { loginRequired } from "../middlewares/loginRequired";

const ScheduleRouter = Router();

ScheduleRouter.use(loginRequired);

// 전체 스케줄 조회
ScheduleRouter.get("/", ScheduleController.getAllSchedule);

// 생체 리듬, 스케줄 추가
ScheduleRouter.post(
  "/create",
  [
    check("type").exists().isIn(["B", "S"]),
    check("start").exists().isDate(),
    check("finish").exists().isDate(),
    check("to_do").exists(),
    validatorErrorChecker,
  ],
  ScheduleController.create,
);

export { ScheduleRouter };
