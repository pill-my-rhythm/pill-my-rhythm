import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as Api from "../../../Api";

const Main = () => {
  const navigate = useNavigate();
  const tempNavigate = () => {
    navigate("/result");
  };
  const [subToken, setSubToken] = useState("");
  const [unSubToken, setUnSubToken] = useState("");
  // TODO: 구독 버튼 위치 옮긴 뒤 로그인시 저장한 accessToken으로 변경해야 함
  const jwt_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YzAzNDlmMS1lMGI3LTQ1YmMtODUxNS01MDU2N2M4N2EyMmMiLCJpYXQiOjE2NTU5NjYyOTksImV4cCI6MTY1NTk2OTg5OX0.dr_TM6K5CJxJySBMi5vy5pKPVYCtv4ys4S7c-bsMmCU";
  const encodedPageLink = encodeURIComponent(`${process.env.REACT_APP_MODE}:${process.env.REACT_APP_FRONT_PORT}/m/subscribe?jwt=${jwt_token}`);
  const QRcode = `https://quickchart.io/qr?text=${encodedPageLink}&ecLevel=L&size=200&centerImageUrl=https://ifh.cc/g/Y4Z5z3.png`;

  const subscribe = async () => {
    console.log("subscribe function");
    const sw = await navigator.serviceWorker.ready;
    // 사용자 기기 정보로 구독 요청
    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_WEB_PUSH_PUBLIC_KEY,
    });
    console.log(JSON.stringify(subscription));
    setSubToken(JSON.stringify(subscription));
    // 사용자 기기 정보 DB에 추가
    await Api.post("subscribe/create", { device_token: subscription });
  };

  const unsubscribe = async () => {
    console.log("unsubscribe function");
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return;

    // 사용자 기기 정보로 구독 취소 요청
    await subscription.unsubscribe();
    setUnSubToken(JSON.stringify(subscription));
    // 사용자 기기 정보 DB에서 삭제
    await Api.post("subscribe/delete", { device_token: subscription });
  };

  return (
    // img 추후에 asset에 저장할 것!
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: "url(" + "https://r7q6w9z6.rocketcdn.me/career/wp-content/uploads/2021/05/image_processing20210222-9274-1wg7luu.gif?w=1000&h=800" + ")" }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center text-neutral-content">
        {/* // * Steps (현재 vertical) */}
        <ul className="steps steps-vertical">
          <li className="step step-primary">Search</li>
          <li className="step">AI analysis</li>
          <li className="step">Result</li>
        </ul>
        <div className="max-w-md">
          {/* // * 메인 Title */}
          <h1 className="mb-5 text-5xl font-bold">Pill my rhythm</h1>
          {/* // * 메인 Description */}
          <p className="mb-5 text-sm">
            요즘 내 상태를 입력하기만 해도
            <br />
            나에게 필요한 영양제를 추천해주는 서비스가 있다면?
            <br />
            지금 바로 내 상태를 간단하게 입력하고
            <br />
            AI의 분석을 통해 나에게 필요한 영양제를 맞춤 추천 받아보세요!
            <br />
          </p>
          <div className="flex-none gap-2">
            <div className="form-control">
              <div className="input-group">
                {/* // * 메인 Search창 */}
                <input type="text" placeholder="요즘 눈이 안 좋아요... 면역력이 떨어졌어요..." className="input input-bordered w-5/6" />
                <button className="btn btn-primary" onClick={tempNavigate}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <button onClick={() => subscribe()}>subscribe</button>
              {/* 로고 이미지 만료 2023-02-28 */}
              <img src={QRcode} alt="QRcode" width="100" height="100" />
              <button onClick={() => unsubscribe()}>unsubscribe</button>
              <p>{subToken}</p>
              <p>{unSubToken}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
