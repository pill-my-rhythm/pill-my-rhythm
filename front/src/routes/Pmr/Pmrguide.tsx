import React from "react";

const Pmrguide = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-tl from-[#7FDCDC] to-[#E3F2ED] flex items-center justify-center">
      {" "}
      <div className="w-full md:w-[68.75rem] py-20 min-h-screen flex flex-col items-center justify-center">
        <div className="w-fit p-2 flex flex-wrap items-center justify-center">
          <div className="p-4 md:p-2 w-full md:w-5/12 ">
            <img src="https://blog.kakaocdn.net/dn/wDgQv/btrGet16eNM/UKyMuTzHQpS7QevKRDgp3K/img.gif" alt="search service" className="rounded-lg shadow-2xl w-[650px]" />
          </div>
          <div className="p-2 m-2 break-words text-center">
            <h1 className="text-2xl md:text-5xl font-bold leading-relaxed md:leading-normal text-white mx-3 md:mx-6">
              AI 문장 분석
              <br />
              영양제 추천 서비스
            </h1>
            <p className="mx-3 my-4 md:m-6 leading-loose text-base md:text-lg">
              검색창에 입력하신 문장을 바탕으로
              <br /> AI가 사용자의 현재 상태를 분석해 <br />
              건강 개선에 도움이 되는 영양제를 추천드리며
              <br />
              더 알아보기를 통해 구매까지 가능합니다
              <br />
            </p>
          </div>
        </div>
        <div className="py-20 w-fit p-2 flex flex-wrap flex-row-reverse items-center justify-center">
          <div className="p-4 md:p-2 w-full md:w-5/12 ">
            <img src="https://blog.kakaocdn.net/dn/rzaCb/btrGflKVrs5/SeDkkBnzMykVDuSTgFXspk/img.gif" alt="search service" className="rounded-lg shadow-2xl w-[650px]" />
          </div>
          <div className="p-2 m-2 break-words text-center">
            <h1 className="text-2xl md:text-5xl font-bold leading-relaxed md:leading-normal text-white mx-3 md:mx-6">
              스케쥴러를 통한 영양제 알림
              <br />
              생체리듬 체크리스트
            </h1>
            <p className="mx-3 my-4 md:m-6 leading-loose text-base md:text-lg">
              북마크한 영양제를 스케쥴러에 입력하면
              <br /> 매일 푸시 알림을 통해 하루 세 번 확인 가능! <br />
              매일 내 생체 리듬 체크리스트를 확인하며 <br />
              건강한 생활습관도 만들어가보세요!
            </p>
          </div>
        </div>
        <div className="py-20 w-fit p-2 flex flex-wrap items-center justify-center">
          <div className="p-4 md:p-2 w-full md:w-5/12">
            <img src="https://blog.kakaocdn.net/dn/baJ07o/btrGfn1zxpA/qDYoteZOs4bAQ7hXDoo6y0/img.gif" alt="search service" className="rounded-lg shadow-2xl w-[650px]" />
          </div>
          <div className="p-2 m-2 break-words text-center">
            <h1 className="text-2xl md:text-5xl font-bold leading-relaxed md:leading-normal text-white mx-3 md:mx-6">
              영양제 북마크 기능
              <br />
              맞춤 데이터 분석 결과 제공
            </h1>
            <p className="mx-3 my-4 md:m-6 leading-loose text-base md:text-lg">
              검색 결과로 나온 영양제 중 북마크한 영양제를 볼 수있고
              <br />
              회원 가입시 입력한 사용자 정보를 바탕으로
              <br />내 또래, 성별이 많이 먹는 영양제도 구매 가능!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pmrguide;
