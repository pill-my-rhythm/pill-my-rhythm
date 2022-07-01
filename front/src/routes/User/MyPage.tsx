import React from "react";
import UserBookMarkList from "./UserBookMarkPage";
import UserMyPage from "./UserMyPage";
import UserRecommendPage from "./UserRecommendPage";
import MyYearlyChecklist from "./MyYearlyChecklist";
import { userState } from "../../atoms";
import { useRecoilValue } from "recoil";

const MyPage = () => {
  const Recoiluser = useRecoilValue(userState);
  // console.log("MyPage#Recoiluser", Recoiluser);

  return (
    <>
      <UserMyPage Recoiluser={Recoiluser} />
      <MyYearlyChecklist />
      <UserBookMarkList />
      <UserRecommendPage Recoiluser={Recoiluser} />
      <div className="bg-gradient-to-tr from-[#7FDCDC] to-[#E3F2ED] flex justify-center py-12 px-4 sm:px-6 lg:px-8 flex items-center">
        <button
          className="bg-transparent flex scroll-smooth"
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          <img src="https://blog.kakaocdn.net/dn/RL8Kv/btrBr5TDbYj/dklV6QQr0hgYlTWfr1AVbk/img.png" alt="scrolltop" width={120} />
        </button>
      </div>
    </>
  );
};
export default MyPage;
