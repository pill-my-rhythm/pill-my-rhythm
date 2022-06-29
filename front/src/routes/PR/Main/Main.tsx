import React, { useState } from "react";
import * as Api from "../../../Api";
import { AES } from "crypto-js";
import Searchbar from "../../_shared/Searchbar";
import { UserStateContext } from "../../Dispatcher";

const Main = () => {
  const userState = useContext(UserStateContext);
  console.log(userState);
  // !

  const [subToken, setSubToken] = useState("");
  const [unSubToken, setUnSubToken] = useState("");

  // TODO: 구독 버튼 위치 옮긴 뒤 로그인시 저장한 accessToken으로 변경해야 함
  const secretKey: any = process.env.REACT_APP_SECRET_KEY;
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YzAzNDlmMS1lMGI3LTQ1YmMtODUxNS01MDU2N2M4N2EyMmMiLCJpYXQiOjE2NTYwODk4MjgsImV4cCI6MTY1NjA5MzQyOH0.xUjK_gWkgJmYNHBAPkellBB9K-nHAVc1mXczESx9u6U";
  const encryptedToken = AES.encrypt(jwtToken, secretKey).toString();
  const encodedPageLink = encodeURIComponent(`${process.env.REACT_APP_MODE}:${process.env.REACT_APP_FRONT_PORT}/m/subscribe?token=${encryptedToken}`);
  const QRcode = `https://quickchart.io/qr?text=${encodedPageLink}&ecLevel=L&size=200&centerImageUrl=https://ifh.cc/g/Y4Z5z3.png`;
  console.log(`${process.env.REACT_APP_MODE}:${process.env.REACT_APP_FRONT_PORT}/m/subscribe?token=${encryptedToken}`);

  const subscribe = async () => {
    console.log("subscribe function");
    const sw = await navigator.serviceWorker.ready;
    if (Notification.permission === "denied") {
      alert("알림 권한을 거부하셨습니다.\n구독을 원하신다면\n[브라우저 설정 - 개인정보 및 보안 - 사이트 설정]에서\nPill my rhythm 사이트의 알림 권한 차단을 재설정해주세요.");
    }
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
    if (!subscription) {
      alert("구독 정보가 없는 기기입니다.");
      return;
    }

    // 사용자 기기 정보 DB에서 삭제
    await Api.post("subscribe/delete", { device_token: subscription });

    // 사용자 기기 정보로 구독 취소 요청
    await subscription.unsubscribe();
    setUnSubToken(JSON.stringify(subscription));
  };

  return (
    // img 추후에 asset에 저장할 것!
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
  );
};
export default Main;
