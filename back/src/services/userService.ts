import bcrypt from "bcrypt";
import redisClient from "../utils/redis";
import { User } from "../db/User";
import { Users } from "../db/models/user";
import { Analysis_ } from "../db/Analysis";
import { makeToken, makeRefreshToken } from "../utils/jwt-util";
import { HttpException } from "../utils/error-util";
import { IUserInput, IUserInfoUpdateInput } from "../interfaces/userInput";

const UserService = {
  addUser: async (data: IUserInput) => {
    const user = await User.findByEmail(data.email);
    if (user) {
      throw new HttpException(409, "중복된 이메일입니다. 다른 이메일을 입력해주세요.");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUserData = { ...data };
    newUserData["password"] = hashedPassword;

    const newUser = await User.addUser(newUserData);
    return newUser;
  },

  getUser: async (email: string, password: string) => {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new HttpException(400, "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
    }
    const correctPasswordHash: string = user.password;
    const isPasswordCorrect: boolean = await bcrypt.compare(password, correctPasswordHash);
    if (!isPasswordCorrect) {
      throw new HttpException(400, "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
    }

    // 로그인 성공 -> access token, refresh token 발급 + redis 저장
    const accessToken = makeToken({ userId: user.pk_user_id });
    const refreshToken = makeRefreshToken();
    redisClient.SETEX(user.pk_user_id, 1209600, refreshToken);

    const { pk_user_id, user_name, gender, age_range, job } = user;
    const userInfo = {
      pk_user_id,
      user_name,
      email,
      gender,
      age_range,
      job,
    };

    return { userInfo, accessToken, refreshToken };
  },

  deleteToken: async (pk_user_id: string) => {
    const user = await User.findById(pk_user_id);
    const getRefreshToken = await redisClient.get(pk_user_id);
    if (!user || !getRefreshToken) {
      throw new HttpException(400, "이메일 또는 비밀번호 입력값이 잘못되었습니다.");
    }

    redisClient.del(pk_user_id);
    const message = "로그아웃 되었습니다.";
    return { message };
  },

  getUserInfo: async (pk_user_id: string) => {
    const userInfo = await User.findById(pk_user_id);
    if (!userInfo) {
      throw new HttpException(400, "가입 내역이 없는 계정입니다. 다시 한 번 확인해 주세요.");
    }
    return userInfo;
  },

  updateUserInfo: async (pk_user_id: string, updateDate: IUserInfoUpdateInput) => {
    // 이메일 db에 존재 여부 확인
    const user: Users = await User.findByUserId(pk_user_id);
    if (!user) {
      throw new HttpException(400, "가입 내역이 없는 계정입니다. 다시 한 번 확인해 주세요.");
    }
    const newUserData = { ...updateDate };

    if (!updateDate.password) {
      newUserData.password = user.password;
    } else {
      const hashedPassword = await bcrypt.hash(updateDate.password, 10);
      newUserData.password = hashedPassword;
    }
    if (!updateDate.gender) newUserData.gender = user.gender;
    if (!updateDate.age_range) newUserData.age_range = user.age_range;
    if (!updateDate.job) newUserData.job = user.job;

    const newUpdatedUser = await User.update(pk_user_id, newUserData);
    return newUpdatedUser;
  },

  delete: async (pk_user_id: string) => {
    const user = await User.findById(pk_user_id);
    if (!user) {
      throw new HttpException(400, "가입 내역이 없는 계정입니다. 다시 한 번 확인해 주세요.");
    }
    const deletedUser = await User.deleteById(pk_user_id);
    return deletedUser;
  },

  getUserAnalysisSupplement: async (pk_user_id: string) => {
    const userInfo = await User.findUserInfo(pk_user_id);
    if (!userInfo) {
      throw new HttpException(400, "가입 내역이 없는 계정입니다. 다시 한 번 확인해 주세요.");
    }
    if (!userInfo.age_range && !userInfo.gender) {
      return null;
    }
    const pre_age = userInfo.age_range.split("대")[0];
    const pre_gender = userInfo.gender.toLowerCase();
    const userAnalysisSupplement = await Analysis_.findByUserInfo(pre_age, pre_gender);
    return userAnalysisSupplement;
  },
};

export { UserService };
