import { Supplement } from "../db/Supplement";
import { HttpException } from "../utils/error-util";

const SupplementService = {
  getAllSupplements: async (pageNum: number, search: string) => {
    const supplements = await Supplement.getAllSupplements(pageNum, search);
    if (!supplements) {
      throw new HttpException(401, "영양제 데이터가 없습니다.");
    }
    return supplements;
  },
};

export { SupplementService };
