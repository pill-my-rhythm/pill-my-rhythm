import { Schedule } from "../db/Schedule";
import { Checklist_ } from "../db/Checklist";
import { DailySupplement } from "../db/DailySupplement";
import { IScheduleCreateInput, IGetScheduleInput } from "../interfaces/scheduleInput";

const ScheduleService = {
  getWeeklySchedule: async (pk_user_id: string, data: IGetScheduleInput) => {
    const schedule = await Schedule.findByWeek(pk_user_id, data.start, data.finish);
    if (!schedule) {
      throw new Error("등록한 일정이 없습니다.");
    }
    const checklist = await Checklist_.findById(pk_user_id);
    const dailySupplement = await DailySupplement.findById(pk_user_id);
    return { schedule, checklist, dailySupplement };
  },
  addSchedule: async (fk_user_id: string, data: IScheduleCreateInput) => {
    const schedule = await Schedule.findByTime(fk_user_id, data.start, data.finish);
    if (schedule) {
      throw new Error("선택한 시간에 다른 일정이 있습니다.");
    }
    data.fk_user_id = fk_user_id;
    const newSchedule = await Schedule.createSchedule(data);
    return newSchedule;
  },
};

export { ScheduleService };
