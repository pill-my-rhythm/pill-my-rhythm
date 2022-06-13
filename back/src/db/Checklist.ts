// import { Op } from "./models";
import { Users } from "./models/user";
import { Checklist } from "./models/checklist";

const Checklist_ = {
  findById: async (fk_user_id: string) => {
    const schedule = await Checklist.findAll({ include: { model: Users, where: { pk_user_id: fk_user_id } } });
    return schedule;
  },
};

export { Checklist_ };
