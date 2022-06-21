/* eslint-disable no-restricted-globals */
// Service Workers 설정에서 Update on reload는 이 파일이 변경됐을 때만 체크

// 서비스 워커에서 발생하는(back에서 보낸) 푸시 이벤트를 수신
// self는 서비스 워커 자체를 참조
self.addEventListener("push", (event) => {
  const data = event.data.json();

  // 브라우저는 전달된 Promise가 확인될 때까지 서비스 워커를 활성화 및 실행 상태로 유지
  event.waitUntil(
    self.registration.showNotification(data.title, {
      icon: "./icon-192x192.png",
      badge: "./badge-72x72.png", // android에서만 보임
      vibrate: [200, 100, 200, 100, 200, 100, 200], // android에서만 동작
      // sound: "./"

      body: data.body,
      actions: [
        {
          action: "homepage-action",
          title: "Pill my rhythm",
          // icon: "/images/demos/action-1-128x128.png",
        },
        {
          action: "checklist-action",
          title: "Checklist",
          // icon: "/images/demos/action-4-128x128.png",
        },
      ],
    }),
  );
});

self.addEventListener(
  "notificationclick",
  (event) => {
    // 알림창 닫음
    event.notification.close();
    // URL을 로드하는 새 창이나 탭이 열림
    switch (event.action) {
      case "homepage-action":
        event.waitUntil(self.clients.openWindow("http://localhost:3000"));
        break;
      // User selected the Archive action.
      case "checklist-action":
        // TODO: front 구현 후 링크 수정해야 함
        event.waitUntil(self.clients.openWindow("http://localhost:3000/schedule/checklist"));
        break;
      // no default
    }
  },
  false,
);
