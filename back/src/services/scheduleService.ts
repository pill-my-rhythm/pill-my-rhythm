import { Schedule } from "../db/Schedule";
// import { Users } from "../db/models/user";
import { IScheduleCreateInput } from "../interfaces/scheduleInput";

const ScheduleService = {
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
