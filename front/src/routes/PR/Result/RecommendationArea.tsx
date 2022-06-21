import React from "react";
import PRCard from "./PRList";
import { Props } from "./Result";

const RecommendationArea = ({ user, isLogin }: Props) => {
  console.log("#R-AreaUser", user);
  return (
    <div className="min-h-screen bg-base-200">
      <div className="w-screen p-2 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-zinc-700 ml-6 mr-6 mt-20 mb-20 leading-normal flex flex-row">
          <img className="w-11 h-11 mr-3" src="https://blog.kakaocdn.net/dn/QFwAO/btrEhqNXezp/jGBQWKKiN3pDmyFOosxe40/img.png" alt="영양제 아이콘" />
          {/* 로그인 상태일 때 */}
          {/* {isLogin ? <h2>{user.user_name}님께는 이런 영양제를 추천드려요!</h2> : <h2>당신에게는 이런 영양제를 추천드려요!</h2>} */}
        </div>
        <div className="flex flex-wrap items-center justify-center ">
          <PRCard />
        </div>
      </div>
    </div>
  );
};
export default RecommendationArea;
