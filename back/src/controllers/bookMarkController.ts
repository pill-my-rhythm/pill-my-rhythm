import { Request, Response, NextFunction } from "express";
import { BookMarkService } from "../services/bookMarkService";

const BookMarkController = {
  getAllBookmarks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const bookmarks = await BookMarkService.getAllBookmarks(fk_user_id);
      res.status(201).json(bookmarks);
    } catch (error) {
      next(error);
    }
  },
  //   create: async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const fk_user_id: string = req.currentUserId;
  //       const { type, start, finish, to_do }: IScheduleCreateInput = req.body;
  //       const newSchedule = await BookMarkService.addBookMark(fk_user_id, { type, start, finish, to_do });

  //       res.status(201).json(newSchedule);
  //     } catch (error) {
  //       next(error);
  //     }
};

export { BookMarkController };
