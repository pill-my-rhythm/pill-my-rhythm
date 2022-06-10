import { Router } from "express";
import { ScheduleController } from "../controllers/scheduleController";
import { check } from "express-validator";
// import { validatorErrorChecker } from "../middlewares/validator";
import { loginRequired } from "../middlewares/loginRequired";

const ScheduleRouter = Router();
ScheduleRouter.use(loginRequired);

ScheduleRouter.post(
  "/create",
  [
    check("type").exists().isIn(["B", "S"]),
    check("start").exists().isDate(),
    check("finish").exists().isDate(),
    check("to_do").exists(),
  ],
  loginRequired,
  ScheduleController.create,
);

export { ScheduleRouter };
