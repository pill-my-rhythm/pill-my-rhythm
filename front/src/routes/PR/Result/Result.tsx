import React, { useContext, useEffect, useState } from "react";
import VideoArea from "./VideoArea";
import RecommendationArea from "./RecommendationArea";
import Promotion from "./Promotion";
import { UserStateContext } from "../../../Dispatcher";

export interface Props {
  user: { age_range: string; createdAt: Date; deletedAt?: null; email: string; gender: string; job: string; password: string; pk_user_id: string; updatedAt: Date; user_name: string };
  isLogin: Boolean;
}

const Result = () => {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  const [user, setUser] = useState<Props["user"]>();

  useEffect(() => {
    setUser(userState.user);
  }, []);

  console.log("#ResultPg_user", user);

  return (
    <div className="overflow-scroll:hidden">
      <VideoArea />
      <RecommendationArea user={user!} isLogin={isLogin} />
      <Promotion />
    </div>
  );
};
export default Result;
