import { Request, Response, NextFunction } from "express";
import { SupplementService } from "../services/supplementService";

const SupplementController = {
  getAllSupplements: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query?.page;
      const pageNum = Number(page);
      const supplements = await SupplementService.getAllSupplements(pageNum);
      res.status(200).json(supplements);
    } catch (error) {
      next(error);
    }
  },
};

export { SupplementController };
