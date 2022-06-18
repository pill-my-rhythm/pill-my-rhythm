import React, { useContext, useState } from "react";
import PRCard1 from "./PRCard1";
import PRCard2 from "./PRCard2";
import PRCard3 from "./PRCard3";
import PRCard4 from "./PRCard4";
import PRCard5 from "./PRCard5";
import { UserStateContext } from "../../../Dispatcher";

const RecommendationArea = () => {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;

  // const name = userState.user.userInfo.user_name;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="w-screen p-2 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-zinc-700 ml-6 mr-6 mt-20 mb-20 leading-normal flex flex-row">
          <img className="w-11 h-11 mr-3" src="https://blog.kakaocdn.net/dn/QFwAO/btrEhqNXezp/jGBQWKKiN3pDmyFOosxe40/img.png" alt="영양제 아이콘" />

          {/* 로그인 상태일 때 */}
          {/* {isLogin ? <h2>{name}님께는 이런 영양제를 추천드려요!</h2> :  */}
          <h2>당신에게는 이런 영양제를 추천드려요!</h2>
          {/* } */}
        </div>
        {/* // * 나중에 값 받아서 map으로 돌려서 뿌려줄 예정! 일단 5개를 예상해서 형태만 잡아둠 => PR카드로 컴포넌트 했는데 값 받아오면 컴포넌트화는 다시 원위치할 듯 */}
        <div className="flex flex-wrap items-center justify-center ">
          <PRCard1 />
          <PRCard2 />
          <PRCard3 />
          <PRCard4 />
          <PRCard5 />
        </div>
      </div>
    </div>
  );
};
export default RecommendationArea;
