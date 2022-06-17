import { Router } from "express";
import { BookMarkController } from "../controllers/bookMarkController";
import { verifyToken } from "../middlewares/verifyToken";

const BookMarkRouter = Router();

BookMarkRouter.use(verifyToken);

// 전체 북마크 조회
BookMarkRouter.get("/", BookMarkController.getAllBookmarks);

// 북마크 추가
// BookMarkRouter.post("/create", BookMarkController.create);

export { BookMarkRouter };
