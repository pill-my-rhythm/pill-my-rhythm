import React from "react";
import { PillData } from "./PRList";

const PRModal = ({ pr }: PillData) => {
  return (
    <div>
      <input type="checkbox" id={`modal-${pr.name}`} className="modal-toggle" />
      <label htmlFor={`modal-${pr.name}`} className="modal cursor-pointer">
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
  );
};
export default PRModal;
