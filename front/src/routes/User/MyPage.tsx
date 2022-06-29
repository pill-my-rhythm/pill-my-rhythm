import React from "react";
import UserBookMarkList from "./UserBookMarkPage";
import UserMyPage from "./UserMyPage";
import UserRecommendPage from "./UserRecommendPage";

const MyPage = () => {
  return (
    <>
      <UserMyPage />
      <UserBookMarkList />
      <UserRecommendPage />
    </>
  );
};
export default MyPage;
