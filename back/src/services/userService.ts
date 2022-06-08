import { User } from "../db/User";
import bcrypt from "bcrypt";
import { IUserInput } from "../interfaces/userInput";

class userService {
  static addUser = async (data: IUserInput) => {
    const user = await User.findByEmail(data.email);
    if (user) {
      throw new Error("중복된 이메일입니다. 다른 이메일을 입력해주세요.");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUserData = { ...data };
    newUserData["password"] = hashedPassword;

    const newUser = await User.addUser(newUserData);
    return newUser;
  };
}

export { userService };
