/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unreachable */

// 사용자가 모바일에서 qrcode 타고 넘어온 화면
// qrcode에 parameter로 jwt_token값 들어 있음
// 해당 jwt_token이랑 device_token으로 구독 정보 추가하도록 backend에 요청

import React, { useState } from "react";
import axios from "axios";

const Subscribe = () => {
  const queryString = new URLSearchParams(window.location.search);
  let jwtToken = queryString.get("jwt");
  console.log(jwtToken);

  const [subToken, setSubToken] = useState("");

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
    await axios
      .post(
        `${process.env.REACT_APP_MODE}:${process.env.REACT_APP_BACK_PORT}/subscribe/create`,
        { device_token: subscription },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      .then(() => {
        alert("모바일 구독 신청이 완료되었습니다.");
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Subscribe with your phone</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Android에서만 가능합니다.</p>
        </div>
        <div>
          <button onClick={() => subscribe()}>subscribe</button>
          <p>{subToken}</p>
        </div>
      </div>
    </div>
  );
};
export default Subscribe;
