import moment from "moment";
import { Op, col } from "./models";
import { Users } from "./models/user";
import { Schedules } from "./models/schedule";
import { Subscribes } from "./models/subscribe";
import { DailySupplements } from "./models/dailySupplement";
import { Supplements } from "./models/supplement";
import { IScheduleCreateInput } from "../interfaces/scheduleInput";

const Schedule = {
  findById: async (pk_schedule_id: number) => {
    const schedule = await Schedules.findOne({ where: { pk_schedule_id } });
    return schedule;
  },

  findByWeek: async (fk_user_id: string, start: Date, finish: Date) => {
    const schedule = await Schedules.findAll({
      where: { start: { [Op.between]: [moment(start).startOf("day").format(), moment(finish).endOf("day").format()] } },
      include: { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
      order: [["start", "ASC"]],
    });
    return schedule;
  },

  createSchedule: async (newScheduleData: IScheduleCreateInput) => {
    const schedule = await Schedules.create(newScheduleData);
    return schedule;
  },

  deleteSchedule: async (fk_user_id: string, pk_schedule_id: number) => {
    const schedule = await Schedules.destroy({
      where: {
        pk_schedule_id: pk_schedule_id,
      },
      force: true,
    });
    return schedule;
  },

  findByTime: async (fk_user_id: string, start: Date, finish: Date) => {
    const schedule = await Schedules.findOne({
      where: { [Op.or]: [{ start: { [Op.between]: [start, finish] }, finish: { [Op.between]: [start, finish] } }] },
      include: { model: Users, where: { pk_user_id: fk_user_id } },
    });
    return schedule;
  },

  findBySupplementSchedule: async (fk_user_id: string, start: Date, to_do: string) => {
    const supplementSchedule = await Schedules.findOne({
      // start가 하루 안에 포함되는 것으로 필터링
      where: {
        type: "S",
        to_do: to_do,
        start: { [Op.between]: [moment(start).startOf("day").format(), moment(start).endOf("day").format()] },
      },
      include: { model: Users, where: { pk_user_id: fk_user_id } },
    });
    return supplementSchedule;
  },

  findByOnlyTime: async (time: Date) => {
    const supplementSchedules = await Schedules.findAll({
      attributes: ["to_do"],
      where: { type: "S", start: time },
      include: {
        required: true, // inner join
        model: Users,
        attributes: ["pk_user_id", "user_name", "email"],
        include: [
          {
            required: true, // inner join
            model: Subscribes,
            attributes: ["device_token"],
          },
          {
            required: false, // outer join, 영양제 일정만 있는 회원 정보도 불러오기
            model: DailySupplements,
            attributes: ["fk_supplement_id"],
            where: { "$User.DailySupplements.type$": { [Op.eq]: col("Schedules.to_do") } },
            include: [
              {
                required: true, // inner join
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
