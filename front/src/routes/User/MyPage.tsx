import React, { useEffect } from "react";
import UserBookMarkList from "./UserBookMarkPage";
import UserMyPage from "./UserMyPage";
import UserRecommendPage from "./UserRecommendPage";
import MyYearlyChecklist from "./MyYearlyChecklist";
import { CurrentuserState } from "../../atoms";
import { useRecoilValue } from "recoil";

const MyPage = () => {
  const Recoiluser = useRecoilValue(CurrentuserState);
  // const refresh = () => {
  //   if (window.location.href.indexOf("#reload") == -1) window.location.href += "#reload";
  // };

  // useEffect(() => {
  //   refresh();
  // }, []);

  return (
    <>
      <UserMyPage Recoiluser={Recoiluser} />
      <MyYearlyChecklist />
      <UserBookMarkList />
      <UserRecommendPage Recoiluser={Recoiluser} />
    </>
  );
};
export default MyPage;
