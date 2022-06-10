import { Schedule } from "../db/Schedule";

const ScheduleService = {
  getAllSchedule: async (pk_user_id: string) => {
    const schedule = Schedule.findById(pk_user_id);
    console.log(schedule);
    return schedule;
  },
};

export { ScheduleService };
