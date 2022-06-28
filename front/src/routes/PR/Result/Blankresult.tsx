import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../../_shared/Searchbar";

const Blankresult = () => {
  return (
    <div className="bg-base-200">
      <div className="p-2 break-words text-center">
        <h1 className="text-5xl font-bold text-white mx-6 pb-4 leading-normal pt-20 text-teal-500">검색 결과가 없습니다.</h1>
        <p className="p-2 text-width-700">Pill my rhythm의 AI가 문장 분석을 실패했습니다.</p>
        <p className="leading-6 p-2 mb-4">
          <br />
          혹시 '건강 상태'가 아닌 '증상'을 입력하신 건 아닌가요?
          <br />
          자주 피곤해요⭕ 감기 기운이 있어요❌
          <br />
          그럼, 다시 한번 시도해보시겠어요?
        </p>
        <Searchbar />
      </div>
      <div className="h-20" />
    </div>
  );
};
export default Blankresult;