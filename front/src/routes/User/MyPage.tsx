import React, { useContext, useState } from "react";
import { UserStateContext } from "../../Dispatcher";
import UserBookMarkList from "./UserBookMarkPage";
import UserMyPage from "./UserMyPage";
import UserRecommendPage from "./UserRecommendPage";

const MyPage = () => {
  const userState = useContext(UserStateContext);

  return (
    <>
      <UserMyPage />
      <UserBookMarkList />
      <UserRecommendPage />
    </>
  );
};
export default MyPage;
