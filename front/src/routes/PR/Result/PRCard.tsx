import React, { useState } from "react";
import MockupData from "./MockupData";

const PRCard = () => {
  const [pillResult, setPillResult] = useState(MockupData);

  // * Card에 목업 데이터 넣어서 뿌려주는 중
  // * Modal에 첫번째 값만 전달되는 문제가 있음. => 모달은 map을 돌리면 안되나..? 더 구글링으로 찾아보고 없으면 변수값을 state로 주는 방법 고려...

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {pillResult.map((pr) => (
        <div className="card card-compact w-80 bg-base-100 shadow-xl m-4" key={pr.id}>
          <figure>
            <img className="w-48 m-6 rounded-lg backdrop-contrast-125 bg-white/30" src={pr.img} alt="pills" />
          </figure>
          <div className="card-body">
            <div className="flex flex-row flex-wrap items-center">
              <h2 className="card-title">{pr.name}</h2>
            </div>
            <p className="m-1 break-words">{pr.functuion}</p>
            <div className="card-actions justify-end items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <label htmlFor="my-modal-4" className="btn modal-button btn-primary">
                더 알아보기
              </label>
              <input type="checkbox" id="my-modal-4" className="modal-toggle" />
              <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                  <h3 className="text-lg text-teal-600 font-bold mb-6">{pr.name}</h3>
                  <div className="flex flex-row">
                    <div className="grid grid-rows-2 flex-row justify-center items-center">
                      <img className="w-48 rounded-lg" src={pr.img} alt="pills" />
                      <p className="py-2 mr-4">{pr.raw}</p>
                    </div>
                    <div>
                      <p className="py-2 font-bold">제조사</p>
                      <p>{pr.company}</p>
                      <p className="py-2 font-bold">효능 </p>
                      <p>{pr.functuion}</p>
                      <p className="py-2 font-bold">사용법 </p>
                      <p>{pr.how_to_eat}</p>
                      <p className="pt-2 font-bold text-red-600">복용 전 유의사항</p>
                      <p className="py-2">{pr.caution}</p>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button className="btn btn-primary" onClick={() => window.open(pr.shop, "_blank")}>
                      주문하러 가기
                    </button>
                  </div>
                </label>
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PRCard;
