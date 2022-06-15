import React from "react";
import PRCard from "./PRCard";

const RecommendationArea = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div>
        <h2>페이지 내용 제목</h2>
      </div>
      {/* // * 나중에 값 받아서 map으로 돌려서 뿌려줄 예정! 일단 5개를 예상해서 형태만 잡아둠 => PR카드로 컴포넌트 했는데 값 받아오면 컴포넌트화는 다시 원위치할 듯 */}
      <div className="flex">
        <PRCard />
        <PRCard />
        <PRCard />
        <PRCard />
        <PRCard />
      </div>
    </div>
  );
};
export default RecommendationArea;
