import { Users } from "./models/user";
import { IUserInput, IUserInfoUpdateInput } from "../interfaces/userInput";

const User = {
  addUser: async (newUserData: IUserInput) => {
    const user = await Users.create(newUserData);
    return user;
  },
  findByEmail: async (email: string) => {
    const user = await Users.findOne({ where: { email } });
    return user;
  },
  findById: async (pk_user_id: string) => {
    const user = await Users.findOne({ where: { pk_user_id } });
    return user;
  },
  deleteById: async (pk_user_id: string) => {
    const filter = { pk_user_id };
    const user = await Users.destroy({ where: filter });
    return user;
  },
  findByUserId: async (pk_user_id: string) => {
    const user = await Users.findOne({ where: { pk_user_id } });
    return user;
  },
  update: async (pk_user_id: string, updateDate: IUserInfoUpdateInput) => {
    const updatedUser = await Users.update(updateDate, { where: { pk_user_id } });
    return updatedUser;
  },
};

export { User };
