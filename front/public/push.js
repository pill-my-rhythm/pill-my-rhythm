import { createInterface } from "readline";
import { config } from "dotenv";
import axios from "axios";
import webpush from "web-push";

config({ path: "../.env", encoding: "utf8" });
// const backendPortNumber = "5000";
// 배포하면 주소 변경해야 함
const serverUrl = "https://kdt-ai4-team17.elicecoding.com/api/";

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: process.env.REACT_APP_WEB_PUSH_PUBLIC_KEY,
  privateKey: process.env.REACT_APP_WEB_PUSH_PRIVATE_KEY,
};

webpush.setVapidDetails(
  "mailto:s0n9h2@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", async (time) => {
  await axios
    .get(serverUrl + "subscribe/push-supplements", { params: { time: time } })
    .then(() => {
      console.log(`${time}에 설정된 푸시 알림을 전송했습니다.`);
    })
    .catch((error) => {
      console.log(error);
    });
  rl.close();
});

rl.on("close", () => {
  process.exit();
});
