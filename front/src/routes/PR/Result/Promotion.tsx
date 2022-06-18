import React from "react";
import { Link } from "react-router-dom";

const Promotion = () => {
  return (
    <div className="bg-base-200">
      <div className="p-2 break-words text-center">
        <h1 className="text-5xl font-bold text-white mr-6 ml-6 leading-normal pt-20">당신을 위한 영양제, 보기만 하고 넘어가실 건가요?</h1>
        <p className="m-6 leading-6 p-4">
          내가 챙겨먹는 영양제 알림 등록부터 생체 리듬 회복을 위한 매일의 체크 리스트까지!
          <br />
          Pill my rhythm의 스케쥴러 서비스를 이용해보세요!
        </p>
        <Link to="/schedule">
          <button className="btn btn-primary">🔔 영양제 알림 일정 등록하러 가기</button>
        </Link>
      </div>
      <div className="h-20" />
    </div>
  );
};
export default Promotion;
