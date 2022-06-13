// import { Op } from "./models";
import { Users } from "./models/user";
import { DailySupplements } from "./models/dailySupplement";

const DailySupplement = {
  findById: async (fk_user_id: string) => {
    const schedule = await DailySupplements.findOne({ include: { model: Users, where: { pk_user_id: fk_user_id } } });
    return schedule;
  },
};

export { DailySupplement };
