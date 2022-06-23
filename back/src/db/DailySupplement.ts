// import { Op } from "./models";
import { Users } from "./models/user";
import { Supplements } from "./models/supplement";
import { DailySupplements } from "./models/dailySupplement";
import { IDailySupplementCreateInput } from "../interfaces/scheduleInput";

const DailySupplement = {
  findById: async (fk_user_id: string) => {
    const schedule = await DailySupplements.findAll({
      include: [
        { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
        { model: Supplements, attributes: ["name"] },
      ],
    });
    return schedule;
  },
  createDailySchedule: async (data: IDailySupplementCreateInput) => {
    const dailySchedule = await DailySupplements.create(data);
    return dailySchedule;
  },
  deletedDailySchedule: async (fk_user_id: string, pk_plan_id: number) => {
    const dailySchedule = await DailySupplements.destroy({
      where: {
        pk_plan_id: pk_plan_id,
      },
      force: true,
    });
    return dailySchedule;
  },
};

export { DailySupplement };
