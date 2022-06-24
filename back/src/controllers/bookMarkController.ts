import { Request, Response, NextFunction } from "express";
import { BookMarkService } from "../services/bookMarkService";

const BookMarkController = {
  getAllBookmarks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const bookmarks = await BookMarkService.getAllBookmarks(fk_user_id);
      res.status(200).json(bookmarks);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const fk_supplement_id = Number(req.params.supplement_id);
      const newBookMark = await BookMarkService.addBookMark({ fk_user_id, fk_supplement_id });

      res.status(200).json(newBookMark);
    } catch (error) {
      next(error);
    }
  },

  deleteBookmark: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fk_user_id: string = req.currentUserId;
      const pk_bookmark_id = Number(req.params.bookmark_id);
      const deletedBookmark = await BookMarkService.deleteBookmark(fk_user_id, pk_bookmark_id);

      res.status(200).json(deletedBookmark);
    } catch (error) {
      next(error);
    }
  },
};

export { BookMarkController };
