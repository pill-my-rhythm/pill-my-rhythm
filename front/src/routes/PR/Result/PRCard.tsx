const PRCard = () => {
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl m-4">
      <figure>
        <img className="w-48 m-6" src="https://blog.kakaocdn.net/dn/QFwAO/btrEhqNXezp/jGBQWKKiN3pDmyFOosxe40/img.png" alt="pills" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">영양제 이름</h2>
        <p>카테고리</p>
        <div className="card-actions justify-end">
          <label htmlFor="my-modal-4" className="btn modal-button btn-primary">
            더 알아보기
          </label>
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h3 className="text-lg text-teal-600 font-bold mb-2">영양제 이름</h3>
              <div className="grid grid-cols-2 flex-row justify-center items-center">
                <img className="w-48" src="https://blog.kakaocdn.net/dn/QFwAO/btrEhqNXezp/jGBQWKKiN3pDmyFOosxe40/img.png" alt="pills" />
                <div>
                  <p className="py-2 font-bold">영양제 카테고리</p>
                  <p className="py-2 font-bold">영양제 성분</p>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <p className="pt-2 font-bold text-red-600">복용 전 유의사항</p>
                  <p className="py-2">
                    Si ergo illa tantum fastidium compesce contra naturalem usum habili, quem habetis vestra potestate, non aliud quam aversantur incurrere. Sed si ipse aversaris, ad languorem: et
                    mors, paupertas et tu miseros fore.
                  </p>
                  <div className="flex justify-end pt-2">
                    <button className="btn btn-primary">주문하러 가기</button>
                  </div>
                </div>
              </div>
            </label>
          </label>
        </div>
      </div>
    </div>
  );
};
export default PRCard;
