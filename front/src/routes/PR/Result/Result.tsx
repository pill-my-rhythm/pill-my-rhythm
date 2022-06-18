import React, { useContext } from "react";
import VideoArea from "./VideoArea";
import RecommendationArea from "./RecommendationArea";
import Promotion from "./Promotion";
import { UserStateContext } from "../../../Dispatcher";

const Result = () => {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  // const name = userState.user.userInfo.user_name;

  return (
    <div className="overflow-scroll:hidden">
      <VideoArea />
      <RecommendationArea />
      <Promotion />
    </div>
  );
};
export default Result;
