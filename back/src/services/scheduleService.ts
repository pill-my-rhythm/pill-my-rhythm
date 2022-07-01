import { User } from "../db/User";
import { Schedule } from "../db/Schedule";
import { Checklist } from "../db/Checklist";
import { DailySupplement } from "../db/DailySupplement";
import { HttpException } from "../utils/error-util";
import { IScheduleCreateInput, IGetScheduleInput, IDailySupplementCreateInput } from "../interfaces/scheduleInput";
import { Http } from "winston/lib/winston/transports";

const ScheduleService = {
  getSchedulePage: async (fk_user_id: string, data: IGetScheduleInput) => {
    const schedule = await Schedule.findByWeek(fk_user_id, data.start, data.finish);
    if (!schedule) {
      throw new HttpException(401, "등록한 일정이 없습니다.");
    }
    const checklist = await Checklist.findByWeek(fk_user_id, data);
    const dailySupplement = await DailySupplement.findById(fk_user_id);
    // TODO: 북마크 정보 추가돼야 함
    return { schedule, checklist, dailySupplement };
  },

  getWeeklySchedule: async (fk_user_id: string, data: IGetScheduleInput) => {
    const schedule = await Schedule.findByWeek(fk_user_id, data.start, data.finish);
    if (!schedule) {
      throw new HttpException(401, "등록한 일정이 없습니다.");
    }
    const checklist = await Checklist.findByWeek(fk_user_id, data);

    return { schedule, checklist };
  },

  addSchedule: async (fk_user_id: string, data: IScheduleCreateInput) => {
    const schedule = await Schedule.findByTime(fk_user_id, data.start, data.finish);
    if (schedule) {
      throw new HttpException(409, "선택한 시간에 다른 일정이 있습니다.");
    }
    const supplementSchedule = await Schedule.findBySupplementSchedule(fk_user_id, data.start, data.to_do);
    if (supplementSchedule) {
      throw new HttpException(409, "아침, 점심, 저녁 일정은 하루에 한 번만 추가가 가능합니다.");
    }

    data.fk_user_id = fk_user_id;
    const newSchedule = await Schedule.createSchedule(data);
    return newSchedule;
  },

  deleteSchedule: async (fk_user_id: string, pk_schedule_id: number) => {
    const user = await User.findById(fk_user_id);
    if (!user) {
      throw new HttpException(401, "가입 내역이 없는 계정입니다. 다시 한 번 확인해 주세요.");
    }
    const schedule = await Schedule.findById(pk_schedule_id);
    if (!schedule) {
      throw new HttpException(401, "등록한 일정이 없습니다.");
    }
    const deletedSchedule = await Schedule.deleteSchedule(fk_user_id, pk_schedule_id);
    return deletedSchedule;
  },

  addDailySupplement: async (data: IDailySupplementCreateInput) => {
    const isAddedSupplement = await DailySupplement.findDailySchedule(data);
    if (isAddedSupplement) {
      throw new HttpException(401, "해당 일정에 이미 추가된 영양제입니다.");
    }
    const dailySupplement = await DailySupplement.createDailySchedule(data);
    return dailySupplement;
  },

  deleteDailySupplement: async (fk_user_id: string, pk_plan_id: number) => {
    const dailySupplement = await DailySupplement.deletedDailySchedule(fk_user_id, pk_plan_id);
    return dailySupplement;
  },
};

export { ScheduleService };
