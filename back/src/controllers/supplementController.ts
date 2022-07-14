import { Request, Response, NextFunction } from "express";
import { SupplementService } from "../services/supplementService";

const SupplementController = {
  getAllSupplements: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query?.page;

      const search_name = req.query?.search_name as string;
      const search_raw = req.query?.search_raw as string;
      const pageNum = Number(page);

      const supplements = await SupplementService.getAllSupplements(pageNum, search_name, search_raw);
      res.status(200).json(supplements);
    } catch (error) {
      next(error);
    }
  },
};

export { SupplementController };
