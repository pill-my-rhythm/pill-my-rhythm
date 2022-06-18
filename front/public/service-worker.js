// 서비스 워커에서 발생하는(back에서 보낸) 푸시 이벤트를 수신
// self는 서비스 워커 자체를 참조
if (typeof window !== "undefined") {
  window.self.addEventListener("push", (event) => {
    console.log("[Service Worker] Push Received.");
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const data = event.data.json();
    // 브라우저는 전달된 Promise가 확인될 때까지 서비스 워커를 활성화 및 실행 상태로 유지
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
      }),
    );

    // 브라우저는 전달된 Promise가 확인될 때까지 서비스 워커를 활성화 및 실행 상태로 유지
    event.waitUntil(window.self.registration.showNotification("Pill my rhythm", options));
  });
}

if (typeof window !== "undefined") {
  window.self.addEventListener("notificationclick", (event) => {
    console.log("[Service Worker] Notification click Received.");
    // 알림창 닫음
    event.notification.close();
    // URL을 로드하는 새 창이나 탭이 열림
    event.waitUntil(window.self.clients.openWindow("https://developers.google.com/web/"));
  });
}
