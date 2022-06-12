import { Checklists } from "./models/checklist";
import { Users } from "./models/user";
import { IChecklistCreateType } from "../interfaces/checklistInput";

const Checklist = {
  createChecklist: async (newChecklistData: IChecklistCreateType) => {
    const checklist = await Checklists.create(newChecklistData);
    return checklist;
  },

  findByDate: async (fk_user_id: string, date: string) => {
    const checklist = await Checklists.findOne({
      where: { date },
      include: { model: Users, where: { pk_user_id: fk_user_id } },
    });
    return checklist;
  },
};

export { Checklist };
