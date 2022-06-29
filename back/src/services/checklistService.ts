import { Checklist } from "../db/Checklist";
import { HttpException } from "../utils/error-util";
import { IChecklistCreateType, IChecklistWeeklyInput } from "../interfaces/checklistInput";

const ChecklistService = {
  addChecklist: async (data: IChecklistCreateType) => {
    const checklist = await Checklist.findByDate(data.fk_user_id, data.date);
    if (checklist) {
      throw new HttpException(409, "오늘은 이미 체크리스트를 작성하셨습니다.");
    }

    const levelCount = Object.values(data).filter((element) => element === true).length;
    if (levelCount >= 5) {
      data.level = 1; // green
    } else if (levelCount >= 3) {
      data.level = 2; // yellow
    } else {
      data.level = 3; // red
    }

    const newChecklist = await Checklist.createChecklist(data);
    return newChecklist;
  },

  getWeeklyChecklist: async (fk_user_id: string, { start, finish }: IChecklistWeeklyInput) => {
    const weeklyChecklist = await Checklist.findByWeek(fk_user_id, { start, finish });
    return weeklyChecklist;
  },

  getYearlyChecklist: async (fk_user_id: string, currentDate: string) => {
    const yearlyChecklist = await Checklist.findByYear(fk_user_id, currentDate);
    return yearlyChecklist;
  },
};

export { ChecklistService };
