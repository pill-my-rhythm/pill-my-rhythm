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
  findByIdAndToDo: async (schedule: any) => {
    const fk_user_id = schedule.fk_user_id;
    const to_do = schedule.to_do;
    const dailySchedule = await DailySupplements.findAll({
      attributes: [],
      where: { type: to_do },
      include: [
        { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
        { model: Supplements, attributes: ["name"] },
      ],
    });
    const dailySupplement = dailySchedule.map((element) => element.get({ plain: true }));
    return dailySupplement;
  },
  findDailySchedule: async (data: IDailySupplementCreateInput) => {
    const addedSupplement = await DailySupplements.findOne({
      where: { type: data.type },
      include: [
        { model: Users, attributes: [], where: { pk_user_id: data.fk_user_id } },
        { model: Supplements, attributes: ["name"], where: { pk_supplement_id: data.fk_supplement_id } },
      ],
    });
    return addedSupplement;
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
