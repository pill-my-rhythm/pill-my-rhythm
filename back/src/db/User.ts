import { Users } from "./models/user";
import sequelize from "Sequelize";
import { IUserInput } from "../interfaces/userInput";

const User = {
  addUser: async (newUserData: IUserInput) => {
    const user = await Users.create(newUserData);
    return user;
  },
  findByEmail: async (email: string) => {
    const user = await Users.findOne({ where: { email: email } });
    return user;
  },
  findById: async (pk_user_id: string) => {
    const user = await Users.findOne({ where: { pk_user_id: pk_user_id } });
    return user;
  },
  delete: async (pk_user_id: string) => {
    const now = sequelize.literal("CURRENT_TIMESTAMP");
    console.log(now);
    const user = await Users.update(
      { deleted_at: sequelize.literal("CURRENT_TIMESTAMP") },
      { where: { pk_user_id: pk_user_id } },
    );
    return user;
  },
};

export { User };
