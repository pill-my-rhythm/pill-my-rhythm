import { Supplement } from "../db/Supplement";
import { HttpException } from "../utils/error-util";

const SupplementService = {
  getAllSupplements: async (pageNum: number, search_name: string, search_raw: string) => {
    const supplements = await Supplement.getAllSupplements(pageNum, search_name, search_raw);
    if (!supplements) {
      throw new HttpException(401, "영양제 데이터가 없습니다.");
    }
    return supplements;
  },
};

export { SupplementService };
