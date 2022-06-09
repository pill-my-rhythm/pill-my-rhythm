import { Users } from "./models/user";
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
    // const now = new Date();
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const time = new Date(Date.now() - timezoneOffset).toISOString().slice(0, 19).replace("T", " ");
    console.log(time);
    const filter = { pk_user_id };
    // const toUpdate = { user_name: '정윤' };
    const user = await Users.destroy({ where: filter });
    return user;
  },
};

export { User };
