import { Router } from "express";
import { ChecklistController } from "../controllers/checklistController";
import { check } from "express-validator";
import { validatorErrorChecker } from "../middlewares/validator";
import { verifyToken } from "../middlewares/verifyToken";

const ChecklistRouter = Router();
ChecklistRouter.use(verifyToken);

// 체크리스트 생성
ChecklistRouter.post(
  "/create",
  [
    check("date").exists().isDate(),
    check("one").exists().isBoolean(),
    check("two").exists().isBoolean(),
    check("three").exists().isBoolean(),
    check("four").exists().isBoolean(),
    check("five").exists().isBoolean(),
    check("six").exists().isBoolean(),
    validatorErrorChecker,
  ],
  ChecklistController.create,
);

// 주간 체크리스트 조회
ChecklistRouter.get(
  "/weekly",
  [check("start").exists().isDate(), check("end").exists().isDate(), validatorErrorChecker],
  ChecklistController.getWeekly,
);

// 연간 체크리스트 조회
ChecklistRouter.get("/yearly", ChecklistController.getYearly);

export { ChecklistRouter };
