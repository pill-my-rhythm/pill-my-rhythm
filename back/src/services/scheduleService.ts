import { Schedule } from "../db/Schedule";
import { Checklist } from "../db/Checklist";
import { DailySupplement } from "../db/DailySupplement";
import { IScheduleCreateInput, IGetScheduleInput, IDailySupplementCreateInput } from "../interfaces/scheduleInput";

const ScheduleService = {
  getWeeklySchedule: async (fk_user_id: string, data: IGetScheduleInput) => {
    const schedule = await Schedule.findByWeek(fk_user_id, data.start, data.finish);
    if (!schedule) {
      throw new Error("등록한 일정이 없습니다.");
    }
    const checklist = await Checklist.findByWeek(fk_user_id, data);
    const dailySupplement = await DailySupplement.findById(fk_user_id);
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
  addDailySupplement: async (data: IDailySupplementCreateInput) => {
    const dailySupplement = await DailySupplement.createDailySchedule(data);
    return dailySupplement;
  },
};

export { ScheduleService };
