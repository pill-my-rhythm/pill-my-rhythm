import React, { useEffect } from "react";
import UserBookMarkList from "./UserBookMarkPage";
import UserMyPage from "./UserMyPage";
import UserRecommendPage from "./UserRecommendPage";
import MyYearlyChecklist from "./MyYearlyChecklist";
import { userState } from "../../atoms";
import { useRecoilValue } from "recoil";
import { useLoginCheck } from "../../hooks/useLoginCheck";
import { ScrollTopButton } from "../_shared/ScrollTopButton";

const MyPage = () => {
  const Recoiluser = useRecoilValue(userState);

  // * 로그인 여부를 확인
  useLoginCheck();

  return (
    <>
      <UserMyPage Recoiluser={Recoiluser} />
      <MyYearlyChecklist />
      <UserBookMarkList />
      <UserRecommendPage Recoiluser={Recoiluser} />
      <div className="bg-gradient-to-tr from-[#7FDCDC] to-[#E3F2ED] flex justify-center py-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <ScrollTopButton />
      </div>
    </>
  );
};
export default MyPage;
