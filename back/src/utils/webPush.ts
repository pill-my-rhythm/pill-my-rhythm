import axios from "axios";
import webpush from "web-push";
import schedule from "node-schedule";

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

export default (): void => {
  webpush.setVapidDetails("mailto:s0n9h2@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);
};

// 배포하면 주소 변경해야 함
const serverUrl = "http://localhost:" + process.env.PORT + "/";

const push = async (time: Date) => {
  await axios
    .get(serverUrl + "subscribe/push-supplements", { params: { time: time } })
    .then(() => {
      console.log(`${time}에 설정된 푸시 알림을 전송했습니다.`);
    })
    .catch((error: Error) => {
      console.log(error);
    });
};

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(0, 6); // 매일
rule.hour = [0, new schedule.Range(6, 23)]; // 오전 6시부터 자정까지
rule.minute = [0, 30]; // 정각과 30분에
rule.tz = "Asia/Seoul"; // 한국 시간 기준

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const job = schedule.scheduleJob(rule, () => {
  const current = new Date();
  push(current);
});
