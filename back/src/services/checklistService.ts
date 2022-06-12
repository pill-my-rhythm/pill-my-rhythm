import { Checklist } from "../db/Checklist";
import { IChecklistCreateType } from "../interfaces/checklistInput";

const ChecklistService = {
  addChecklist: async (data: IChecklistCreateType) => {
    const checklist = await Checklist.findByDate(data.fk_user_id, data.date);
    if (checklist) {
      throw new Error("오늘은 이미 체크리스트를 작성하셨습니다.");
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
};

export { ChecklistService };
