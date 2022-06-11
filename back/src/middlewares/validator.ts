import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validatorErrorChecker = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { validatorErrorChecker };
