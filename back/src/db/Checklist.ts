import { Op } from "./models";
import moment from "moment";
import { Checklists } from "./models/checklist";
import { Users } from "./models/user";
import { IChecklistCreateType, IChecklistWeeklyInput } from "../interfaces/checklistInput";

const Checklist = {
  createChecklist: async (newChecklistData: IChecklistCreateType) => {
    const checklist = await Checklists.create(newChecklistData);
    return checklist;
  },

  findByDate: async (fk_user_id: string, date: Date) => {
    const checklist = await Checklists.findOne({
      where: { date },
      include: { model: Users, where: { pk_user_id: fk_user_id } },
    });
    return checklist;
  },

  findByWeek: async (fk_user_id: string, { start, finish }: IChecklistWeeklyInput) => {
    const checklists = await Checklists.findAll({
      attributes: ["date", "level"],
      where: { date: { [Op.between]: [start, finish] } },
      include: { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
      order: [["date", "ASC"]],
    });
    return checklists;
  },

  findByYear: async (fk_user_id: string, currentDate: string) => {
    const checklists = await Checklists.findAll({
      attributes: ["date", "level"],
      where: {
        date: {
          [Op.between]: [moment(currentDate).startOf("year").format(), moment(currentDate).endOf("year").format()],
        },
      },
      include: { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
      order: [["date", "ASC"]],
    });
    console.log(moment(currentDate).startOf("year").format());
    return checklists;
  },
};

export { Checklist };
