import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTopButton } from "../../_shared/ScrollTopButton";

const Promotion = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-200 w-screen">
      <div className="p-2 break-words text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mx-6 leading-relaxed pt-20 text-teal-500">당신을 위한 영양제, 보기만 하고 가실건가요?</h1>
        <p className="m-6 leading-6 p-4">
          내가 챙겨먹는 영양제 알림 서비스부터
          <br />
          생체 리듬 회복을 위한 체크 리스트까지!
          <br />
          Pill my rhythm의 스케줄러를 이용해보세요!
        </p>

        <button className="btn btn-primary" onClick={() => navigate("/schedule")}>
          🔔 영양제 알림 일정 등록하러 가기
        </button>
      </div>
      <div className="h-20 flex items-center justify-center mt-8 mx-4">
        <ScrollTopButton />
      </div>
    </div>
  );
};
export default Promotion;
