import { Op } from "./models";
import { Users } from "./models/user";
import { Schedules } from "./models/schedule";
import { IScheduleCreateInput } from "../interfaces/scheduleInput";

const Schedule = {
  findByWeek: async (fk_user_id: string, start: Date, finish: Date) => {
    const schedule = await Schedules.findAll({
      where: { start: { [Op.between]: [start, finish] } },
      include: { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
      order: [["start", "ASC"]],
    });
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

  findByOnlyTime: async (time: Date) => {
    const schedules = await Schedules.findAll({
      attributes: ["fk_user_id", "to_do"],
      where: { type: "S", start: time },
      include: { model: Users, attributes: ["user_name"] },
    });
    const scheduleData = schedules.map((element) => element.get({ plain: true }));
    return scheduleData;
  },
};

export { Schedule };
