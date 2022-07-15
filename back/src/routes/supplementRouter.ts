import { Router } from "express";
import { SupplementController } from "../controllers/supplementController";

const SupplementRouter = Router();

// 전체 영양제 조회
SupplementRouter.get("/", SupplementController.getAllSupplements);

export { SupplementRouter };
