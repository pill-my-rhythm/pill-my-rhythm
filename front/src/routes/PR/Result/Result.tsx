import React, { useContext } from "react";
import VideoArea from "./VideoArea";
import RecommendationArea from "./RecommendationArea";
import Promotion from "./Promotion";
import { UserStateContext } from "../../../Dispatcher";

export interface Props {
  isLogin: Boolean;
}

const Result = () => {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;

  return (
    <div className="overflow-scroll:hidden">
      <VideoArea />
      <RecommendationArea isLogin={isLogin} />
      <Promotion />
    </div>
  );
};
export default Result;
