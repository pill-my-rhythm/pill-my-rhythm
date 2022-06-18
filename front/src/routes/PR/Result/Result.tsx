import React, { useContext, useState } from "react";
import VideoArea from "./VideoArea";
import RecommendationArea from "./RecommendationArea";
import Promotion from "./Promotion";
import { UserStateContext } from "../../../Dispatcher";

// export interface UserData {
//   age_range: string;
//   createdAt: Date;
//   deletedAt: null;
//   email: string;
//   gender: string;
//   job: string;
//   password: string;
//   pk_user_id: string;
//   updatedAt: Date;
//   user_name: string;
// }

const Result = () => {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  const user = userState.user;

  console.log("#user", user);

  return (
    <div className="overflow-scroll:hidden">
      <VideoArea />
      <RecommendationArea />
      <Promotion />
    </div>
  );
};
export default Result;
