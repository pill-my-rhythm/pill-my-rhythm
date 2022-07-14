import React, { useEffect } from "react";
import UserBookMarkList from "./UserBookMarkPage";
import UserMyPage from "./UserMyPage";
import UserRecommendPage from "./UserRecommendPage";
import MyYearlyChecklist from "./MyYearlyChecklist";
import { userState } from "../../atoms";
import { useRecoilValue } from "recoil";
import { ScrollTopButton } from "../_shared/ScrollTopButton";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const Recoiluser = useRecoilValue(userState);
  // console.log(Recoiluser);
  const isLogin = !(Recoiluser.length === 0);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
      alert("로그인 후 이용해주세요!");
    }
  }, []);

  return (
    <>
      <UserMyPage Recoiluser={Recoiluser} isLogin={isLogin} />
      <MyYearlyChecklist />
      <UserBookMarkList isLogin={isLogin} />
      <UserRecommendPage Recoiluser={Recoiluser} isLogin={isLogin} />
      <div className="bg-gradient-to-tr from-[#7FDCDC] to-[#E3F2ED] flex justify-center py-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <ScrollTopButton />
      </div>
    </>
  );
};
export default MyPage;
