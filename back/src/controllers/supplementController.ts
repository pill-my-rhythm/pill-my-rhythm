import { Request, Response, NextFunction } from "express";
import { SupplementService } from "../services/supplementService";

const SupplementController = {
  getAllSupplements: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query?.page;
      const word = req.query?.search as string;

      const pageNum = Number(page);
      const search = word?.toLocaleLowerCase();

      const supplements = await SupplementService.getAllSupplements(pageNum, search);
      res.status(200).json(supplements);
    } catch (error) {
      next(error);
    }
  },
};

export { SupplementController };
