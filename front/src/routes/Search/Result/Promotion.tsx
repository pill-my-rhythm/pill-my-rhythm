import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserStateContext } from "../../../Dispatcher";

const Promotion = () => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;

  const MoveLogin = () => {
    alert("로그인 후 이용해주세요!");
    navigate("/login");
  };

  const ControlScheduler = () => {
    if (isLogin) {
      navigate("/schedule");
    } else {
      MoveLogin();
    }
  };

  return (
    <div className="bg-base-200 w-screen">
      <div className="p-2 break-words text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mx-6 leading-relaxed pt-20 text-teal-500">당신을 위한 영양제, 보기만 하고 넘어가실 건가요?</h1>
        <p className="m-6 leading-6 p-4">
          내가 챙겨먹는 영양제 알림 등록부터
          <br />
          생체 리듬 회복을 위한 매일의 체크 리스트까지!
          <br />
          Pill my rhythm의 스케쥴러 서비스를 이용해보세요!
        </p>

        <button className="btn btn-primary" onClick={ControlScheduler}>
          🔔 영양제 알림 일정 등록하러 가기
        </button>
      </div>
      <div className="h-20" />
    </div>
  );
};
export default Promotion;
