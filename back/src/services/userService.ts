import { User } from "../db/User";
import { Users } from "../db/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserInput, IUserInfoUpdateInput } from "../interfaces/userInput";

const UserService = {
  addUser: async (data: IUserInput) => {
    const user = await User.findByEmail(data.email);
    if (user) {
      throw new Error("중복된 이메일입니다. 다른 이메일을 입력해주세요.");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUserData = { ...data };
    newUserData["password"] = hashedPassword;

    const newUser = await User.addUser(newUserData);
    return newUser;
  },

  // getUser: async ({ email, password }: loginType) => {
  getUser: async (email: string, password: string) => {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error("해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash: string = user.password;
    const isPasswordCorrect: boolean = await bcrypt.compare(password, correctPasswordHash);
    if (!isPasswordCorrect) {
      throw new Error("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey: string = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.pk_user_id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const { pk_user_id, user_name, gender, age_range, job } = user;

    const loginUser = {
      token,
      pk_user_id,
      user_name,
      email,
      password,
      gender,
      age_range,
      job,
    };

    return loginUser;
  },

  updateUserInfo: async (pk_user_id: string, updateDate: IUserInfoUpdateInput) => {
    // 이메일 db에 존재 여부 확인
    const user: Users = await User.findByUserId(pk_user_id);
    if (!user) {
      throw new Error("가입 내역이 없는 계정입니다. 다시 한 번 확인해 주세요.");
    }

    const updatedUser = await User.update(pk_user_id, updateDate);

    return updatedUser;
  },
};

export { UserService };
