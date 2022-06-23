import { Router } from "express";
import { ChecklistController } from "../controllers/checklistController";
import { check } from "express-validator";
import { validatorErrorChecker } from "../middlewares/validator";
import { verifyToken } from "../middlewares/verifyToken";

const ChecklistRouter = Router();
ChecklistRouter.use(verifyToken);

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

ChecklistRouter.get(
  "/weekly",
  [check("start").exists().isDate(), check("end").exists().isDate(), validatorErrorChecker],
  ChecklistController.getWeekly,
);

export { ChecklistRouter };
