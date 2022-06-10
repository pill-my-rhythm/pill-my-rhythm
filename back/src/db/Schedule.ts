import { Users } from "./models/user";
import { Schedules } from "./models/schedule";

const Schedule = {
  findById: async (pk_user_id: string) => {
    const schedule = await Users.findAll({ where: { pk_user_id: pk_user_id }, include: { model: Schedules } });
    return schedule;
  },
};

export { Schedule };
