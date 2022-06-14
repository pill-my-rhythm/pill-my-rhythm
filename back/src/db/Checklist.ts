import { Op } from "./models";
import { Users } from "./models/user";
import { Checklist } from "./models/checklist";

const Checklist_ = {
  findByWeek: async (pk_user_id: string, start: Date, finish: Date) => {
    const checklists = await Checklist.findAll({
      attributes: ["date", "level"],
      where: { date: { [Op.between]: [start, finish] } },
      include: { model: Users, attributes: [], where: { pk_user_id: pk_user_id } },
      order: [["date", "ASC"]],
    });
    return checklists;
  },
};

export { Checklist_ };
