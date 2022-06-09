import { Users } from "./models/user";
import { IUserInput, IUserInfoUpdateInput } from "../interfaces/userInput";

const User = {
  addUser: async (newUserData: IUserInput) => {
    const user = await Users.create(newUserData);
    return user;
  },
  findByEmail: async (email: string) => {
    const user = await Users.findOne({ where: { email: email } });
    return user;
  },
  // static async delete({ userId }) {
  //   try {
  //     const result = await Users.destroy({ where: { pk_user_id: user_id } });
  //     return result;
  //   } catch (err) {
  //     return { error: err };
  //   }
  // }

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
