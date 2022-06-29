import React, { useState } from "react";
import { AES } from "crypto-js";
import { post } from "../../Api";

function Subscribe() {
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
    await post("subscribe/create", { device_token: subscription });
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
    await post("subscribe/delete", { device_token: subscription });

    // 사용자 기기 정보로 구독 취소 요청
    await subscription.unsubscribe();
    setUnSubToken(JSON.stringify(subscription));
  };
  return (
    <div className="flex-none gap-2">
      <button onClick={() => subscribe()}>subscribe</button> <br />
      {/* 로고 이미지 만료 2023-02-28 */}
      <button onClick={() => unsubscribe()}>unsubscribe</button>
      <img src={QRcode} alt="QRcode" width="100" height="100" />
      <p>{subToken}</p>
      <p>{unSubToken}</p>
    </div>
  );
}

export default Subscribe;
