import React, { useContext, useState } from 'react';
import { AES } from 'crypto-js';
import { post } from '../../Api';
import { UserStateContext } from '../../Dispatcher';

function Subscribe() {
  const userState = useContext(UserStateContext);
  const [subToken, setSubToken] = useState('');
  const [unSubToken, setUnSubToken] = useState('');

  const secretKey: any = process.env.REACT_APP_SECRET_KEY;
  const jwtToken = String(userState.user.accessToken);
  const encryptedToken = AES.encrypt(jwtToken, secretKey).toString();
  const encodedPageLink = encodeURIComponent(`${process.env.REACT_APP_MODE}/m/subscribe?token=${encryptedToken}`);
  const QRcode = `https://quickchart.io/qr?text=${encodedPageLink}&ecLevel=L&size=200&centerImageUrl=https://ifh.cc/g/Y4Z5z3.png`;

  const subscribe = async () => {
    console.log('subscribe function');
    const sw = await navigator.serviceWorker.ready;
    if (Notification.permission === 'denied') {
      alert('알림 권한을 거부하셨습니다.\n구독을 원하신다면\n[브라우저 설정 - 개인정보 및 보안 - 사이트 설정]에서\nPill my rhythm 사이트의 알림 권한 차단을 재설정해주세요.');
    }
    // 사용자 기기 정보로 구독 요청
    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_WEB_PUSH_PUBLIC_KEY,
    });

    setSubToken(JSON.stringify(subscription));

    // 사용자 기기 정보 DB에 추가
    try {
      await post('subscribe/create', { device_token: subscription });
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
    }
  };

  const unsubscribe = async () => {
    console.log('unsubscribe function');
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      alert('구독 정보가 없는 기기입니다.');
      return;
    }
    // 사용자 기기 정보 DB에서 삭제
    await post('subscribe/delete', { device_token: subscription });

    // 사용자 기기 정보로 구독 취소 요청
    await subscription.unsubscribe();
    setUnSubToken(JSON.stringify(subscription));
  };
  return (
    <div className='py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6'>
      <div className='text-center space-y-2 sm:text-left'>
        <div className='space-y-0.5'>
          <p className='text-md text-black font-semibold mb-1'>구독 서비스</p>
          <p className='text-slate-500 font-medium text-sm'>영양제 일정 알림을 받아보세요!</p>
        </div>

        <button className='px-0 py-1 text-sm text-teal-600 font-semibold rounded-full border border-teal-200 hover:text-white hover:bg-teal-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2'>
          <label htmlFor='QRcode' className='modal-button cursor-pointer px-4 py-1'>
            구독하러 가기
          </label>
        </button>

        <input type='checkbox' id='QRcode' className='modal-toggle' />
        <label htmlFor='QRcode' className='modal cursor-pointer'>
          <label className='modal-box relative' htmlFor=''>
            <h2 className='card-title mb-1 text-teal-500'>영양제 일정 알림 구독 서비스</h2>
            <div className='divider'>Web</div>

            <div className='items-center justify-center flex flex-row space-x-2 p-2'>
              <button
                onClick={() => subscribe()}
                className='px-4 py-1 text-sm text-teal-600 font-semibold rounded-full border border-teal-200 hover:text-white hover:bg-teal-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2'
              >
                구독하기
              </button>
              <button
                onClick={() => unsubscribe()}
                className='px-4 py-1 text-sm text-teal-600 font-semibold rounded-full border border-teal-200 hover:text-white hover:bg-teal-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2'
              >
                구독 취소
              </button>
            </div>

            <div className='divider'>Mobile</div>
            <div className='items-center justify-center flex flex-col'>
              <img src={QRcode} alt='QRcode' width='170' height='170' className='rounded-xl' />
              <h3 className='text-slate-900 mt-5 text-base font-medium tracking-tight'>모바일 알림 구독 QR</h3>
              <p className='text-slate-500  mt-2 text-sm text-left'>
                영양제 일정 알림 서비스는 현재 ios에서 지원되지 않아 Android 또는 Web에서만 가능합니다. Android 접속시 google 애플리케이션의 google lens를 이용하시는 것을 추천드립니다.
              </p>
            </div>
          </label>
        </label>
      </div>
    </div>
  );
}

export default Subscribe;
