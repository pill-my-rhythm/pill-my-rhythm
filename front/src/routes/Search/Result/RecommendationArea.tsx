import React from "react";
import PRList from "./PRList";
import { userState } from "../../../atoms";
import { useRecoilValue } from "recoil";
export interface Userdata {
  age_range: string;
  createdAt: Date;
  deletedAt?: null;
  email: string;
  gender: string;
  job: string;
  password: string;
  pk_user_id: string;
  updatedAt: Date;
  user_name: string;
}

const RecommendationArea = () => {
  const Currentuser: any = useRecoilValue(userState);
  // console.log("#결과페이지유저", Currentuser);
  const user = Currentuser;
  const isLogin = !(user.length === 0);

  return (
    <div className="bg-base-200">
      <div className="w-screen p-2 flex flex-col items-center justify-center">
        <div className="text-3xl md:text-4xl font-bold text-zinc-700 px-6 pt-20 pb-10 leading-normal flex flex-row">
          <img
            className="w-11 h-11 mr-3"
            src="https://blog.kakaocdn.net/dn/QFwAO/btrEhqNXezp/jGBQWKKiN3pDmyFOosxe40/img.png"
            alt="영양제 아이콘"
          />
          {!isLogin ? (
            <h2>당신에게는 이런 영양제를 추천드려요!</h2>
          ) : (
            <h2>{user.user_name}님께는 이런 영양제를 추천드려요!</h2>
          )}
        </div>
        <div className="w-fit alert alert-warning shadow-lg mb-10 mx-4 bg-transparent border-solid border-2 border-red-400 text-red-500">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="select-none leading-normal text-sm md:text-md">
              Pill my rhytym의 AI 분석은 당신의 증상 개선에 도움이 되는 <u>건강기능식품</u>을 추천드리는 서비스입니다.{" "}
              <br />
              질병의 진단 및 치료는 전문적인 의료기관을 이용하세요.
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center ">
          <PRList />
        </div>
      </div>
    </div>
  );
};
export default RecommendationArea;
