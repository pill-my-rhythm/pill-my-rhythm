import MockupData from "./MockupData";

const PRCard = () => {
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl m-4">
      <figure>
        <img className="w-48 m-6 rounded-lg backdrop-contrast-125 bg-white/30" src={MockupData.img} alt="pills" />
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
              <h3 className="text-lg text-teal-600 font-bold mb-6">{MockupData.name}</h3>

              <div className="flex flex-row">
                <div className="grid grid-rows-2 flex-row justify-center items-center">
                  <img className="w-48 rounded-lg" src={MockupData.img} alt="pills" />
                  <p className="py-2 mr-4">{MockupData.raw}</p>
                </div>
                <div>
                  <p className="py-2 font-bold">제조사</p>
                  <p>{MockupData.company}</p>
                  <p className="py-2 font-bold">효능 </p>
                  <p>{MockupData.functuion}</p>
                  <p className="py-2 font-bold">사용법 </p>
                  <p>{MockupData.how_to_eat}</p>
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
