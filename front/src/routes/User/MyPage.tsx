import React, { useContext, useState } from "react";
import { UserStateContext } from "../../Dispatcher";
import UserBookMarkList from "./UserBookMarkPage";
import UserMyPage from "./UserMyPage";

const MyPage = () => {
  const userState = useContext(UserStateContext);

  return (
    <>
      {/* <img className="w-screen" src="https://blog.kakaocdn.net/dn/lYHux/btrE4nVMvMo/Hn1wvs9Mgf7m7m2oo4boB0/img.png" alt="목업 데이터" /> */}
      <UserMyPage />
      <UserBookMarkList />;
    </>
  );
};
export default MyPage;
