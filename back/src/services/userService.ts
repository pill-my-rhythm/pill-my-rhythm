import { User } from "../db/models";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

// type loginType = {
//   email: string;
//   password: string;
// };

const UserService = {
  // getUser: async ({ email, password }: loginType) => {
  getUser: async (email: string, password: string) => {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error("해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
    if (!isPasswordCorrect) {
      throw new Error("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.userId }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const { userId, nickname, bookmarks } = user;

    const loginUser = {
      token,
      userId,
      email,
      nickname,
      bookmarks,
      errorMessage: null,
    };

    return loginUser;
  },
};

export { UserService };
