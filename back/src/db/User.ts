import { Users } from "./models/user";
import { IUserInput } from "../interfaces/userInput";

// export interface IUserModelInput {
//   pk_user_id: string;
//   user_name: string;
//   email: string;
//   password: string;
//   gender?: string;
//   age_range?: string;
//   job?: string;
// }

class User {
  static async addUser(newUserData: IUserInput) {
    try {
      const user = await Users.create(newUserData);
      return user;
    } catch (error) {
      return { error };
    }
  }

  static async findByEmail(email: string) {
    try {
      const user = await Users.findOne({ where: { email: email } });
      return user;
    } catch (error) {
      return { error };
    }
  }

  // static async delete({ userId }) {
  //   try {
  //     const result = await Users.destroy({ where: { pk_user_id: user_id } });
  //     return result;
  //   } catch (err) {
  //     return { error: err };
  //   }
  // }
}

export { User };
