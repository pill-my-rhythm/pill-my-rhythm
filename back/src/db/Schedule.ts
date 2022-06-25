import { Op, col } from "./models";
import { Users } from "./models/user";
import { Schedules } from "./models/schedule";
import { Subscribes } from "./models/subscribe";
import { DailySupplements } from "./models/dailySupplement";
import { Supplements } from "./models/supplement";
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
    const supplementSchedules = await Schedules.findAll({
      attributes: ["to_do"],
      where: { type: "S", start: time, "$User.DailySupplements.type$": { [Op.eq]: col("Schedules.to_do") } },
      include: {
        required: true, // inner join
        model: Users,
        attributes: ["pk_user_id", "user_name", "email"],
        include: [
          {
            required: true,
            model: Subscribes,
            attributes: ["device_token"],
          },
          {
            required: true,
            model: DailySupplements,
            attributes: ["fk_supplement_id"],
            include: [
              {
                required: true,
                model: Supplements,
                attributes: ["name"],
              },
            ],
          },
        ],
      },
    });
    const supplementSchedulesData = supplementSchedules.map((element) => element.get({ plain: true }));
    return supplementSchedulesData;
  },
};

export { Schedule };
