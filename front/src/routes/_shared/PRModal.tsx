import React from "react";
import { PillData } from "../PR/Result/PRList";

const PRModal = ({ pr }: PillData) => {
  return (
    <div>
      <input type="checkbox" id={`modal-${pr.name}`} className="modal-toggle" />
      <label htmlFor={`modal-${pr.name}`} className="modal cursor-pointer">
        <label className="modal-box relative break-words w-4/5 m-10" htmlFor="">
          <h3 className="text-lg text-teal-600 font-bold">{pr.name}</h3>
          <hr className="my-2" />
          <div className="flex md:flex-row flex-col justify-center items-center leading-normal p-1">
            <div className="flex flex-col md:w-3/6 justify-center items-center">
              <img className="flex w-48 rounded-lg" src={pr.img_link} alt="pills" />
              <div className="mx-2 md:px-2 leading-normal">
                <p className="font-bold">성분</p>
                <p>{pr.raw}</p>
              </div>
            </div>
            <div className="md:w-3/6 m-2 md:p-2 break-all leading-normal">
              <p className=" font-bold">제조사</p>
              <p>{pr.company}</p>
              <p className=" font-bold">효능 </p>
              <p>{pr.function}</p>
              <p className=" font-bold">사용법 </p>
              <p>{pr.how_to_eat}</p>
              <div className="px-2 py-1 my-2 border border-solid rounded border-red-500 border-2">
                <p className="pt-2 font-bold text-red-600">※ 복용 전 유의사항 ※</p>
                <p className="">{pr.caution}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button className="btn btn-primary" onClick={() => window.open(pr.link, "_blank")}>
              주문하러 가기
            </button>
          </div>
        </label>
      </label>
    </div>
  );
};
export default PRModal;
