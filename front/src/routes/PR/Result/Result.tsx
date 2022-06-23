import React, { useContext, useEffect, useState } from "react";
import VideoArea from "./VideoArea";
import RecommendationArea from "./RecommendationArea";
import Promotion from "./Promotion";
import { UserStateContext } from "../../../Dispatcher";

export interface UserData {
  age_range: string;
  createdAt: Date;
  deletedAt?: null;
  email: string;
  gender: string;
  job: string;
  password: string;
  pk_user_id: string;
  updatedAt: Date;
  user_name: string;
}

const Result = () => {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    setUser(userState.user);
  }, [setUser]);

  console.log("#ResultPg_user", user);

  return (
    <div className="overflow-scroll:hidden">
      <VideoArea />
      {/* //! 현재 user={user}로 props 전달 안 됌,, 수정할 것 => '{ user: UserData | undefined; }' 형식은 'IntrinsicAttributes & UserData' 형식에 할당할 수 없습니다. 'IntrinsicAttributes & UserData' 형식에 'user' 속성이 없습니다. */}
      <RecommendationArea />
      <Promotion />
    </div>
  );
};
export default Result;
