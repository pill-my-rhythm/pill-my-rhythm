import { Router } from "express";
import { ChecklistController } from "../controllers/checklistController";
import { check } from "express-validator";
import { loginRequired } from "../middlewares/loginRequired";

const ChecklistRouter = Router();
ChecklistRouter.use(loginRequired);

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
  ],
  loginRequired,
  ChecklistController.create,
);

export { ChecklistRouter };
