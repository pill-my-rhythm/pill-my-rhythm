import MockupData from "./MockupData";

const PRCard = () => {
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl m-4">
      <figure>
        <img className="w-48 m-6" src={MockupData.img} alt="pills" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{MockupData.name}</h2>
        <p className="m-1 break-words">{MockupData.functuion}</p>
        <div className="card-actions justify-end">
          <label htmlFor="my-modal-4" className="btn modal-button btn-primary">
            더 알아보기
          </label>
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg text-teal-600 font-bold mb-2">{MockupData.name}</h3>

              <div className="flex flex-row">
                <div className="grid grid-rows-2 flex-row justify-center items-center">
                  <img className="w-48" src={MockupData.img} alt="pills" />
                  <p className="py-2">{MockupData.raw}</p>
                </div>
                <div>
                  <p className="py-2 font-bold">
                    제조사
                    <br /> {MockupData.company}
                  </p>
                  <p className="py-2 font-bold">
                    효능 <br />
                    {MockupData.functuion}
                  </p>
                  <p className="py-2 font-bold">
                    사용법 <br />
                    {MockupData.how_to_eat}
                  </p>

                  {/* // * 복용시간 이미지 아이콘 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg> */}

                  <p className="pt-2 font-bold text-red-600">복용 전 유의사항</p>
                  <p className="py-2">{MockupData.caution}</p>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button className="btn btn-primary" onClick={() => window.open(MockupData.shop, "_blank")}>
                  주문하러 가기
                </button>
              </div>
            </label>
          </label>
        </div>
      </div>
    </div>
  );
};
export default PRCard;
