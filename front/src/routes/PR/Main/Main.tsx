import React from "react";
import Searchbar from "../../_shared/Searchbar";

const Main = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: "url(" + "https://r7q6w9z6.rocketcdn.me/career/wp-content/uploads/2021/05/image_processing20210222-9274-1wg7luu.gif?w=1000&h=800" + ")" }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center text-neutral-content flex flex-col md:flex-row">
        {/* // * Steps (현재 vertical) */}
        <ul className="steps steps-col md:steps-vertical">
          <li className="step step-primary">Search</li>
          <li className="step">AI analysis</li>
          <li className="step">Result</li>
        </ul>
        <div className="max-w-md">
          {/* // * 메인 Title */}
          <h1 className="mb-5 text-5xl font-bold">Pill my rhythm</h1>
          {/* // * 메인 Description */}
          <p className="mb-5 text-base">
            요즘 내 상태를 입력하기만 해도
            <br />
            나에게 필요한 영양제를 추천해주는 서비스가 있다면?
            <br />
            지금 바로 내 건강 상태를 간단하게 입력하고
            <br />
            AI의 분석을 통해 나에게 필요한 영양제를 맞춤 추천 받아보세요!
            <br />
          </p>
          <div className="flex-none gap-2">
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
