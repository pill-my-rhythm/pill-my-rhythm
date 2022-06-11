import { Op } from "./models";
import { Users } from "./models/user";
import { Schedules } from "./models/schedule";
import { IScheduleCreateInput } from "../interfaces/scheduleInput";

const Schedule = {
  findById: async (pk_user_id: string) => {
    const schedule = await Schedules.findAll({ include: { model: Users, where: { pk_user_id: pk_user_id } } });
    return schedule;
  },
  createSchedule: async (newScheduleData: IScheduleCreateInput) => {
    const schedule = await Schedules.create(newScheduleData);
    return schedule;
  },

  findByTime: async (fk_user_id: string, start: Date, finish: Date) => {
    const schedule = await Schedules.findOne({
      where: { [Op.or]: [{ start: { [Op.between]: [start, finish] }, finish: { [Op.between]: [start, finish] } }] },
      include: { model: Users, where: { pk_user_id: fk_user_id } },
    });
    return schedule;
  },
};

export { Schedule };
