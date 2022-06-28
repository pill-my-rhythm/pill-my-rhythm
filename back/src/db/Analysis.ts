import { Op } from "./models";
import { Analysis } from "../db/models/analysis";

const Analysis_ = {
  findByUserInfo: async (age_range: string, gender: string) => {
    const analysis = await Analysis.findAll({
      where: {
        [Op.and]: [{ age: age_range }, { gender: gender }],
      },
    });
    return analysis;
  },
};

export { Analysis_ };
