import { createInterface } from "readline";
import { config } from "dotenv";
import axios from "axios";
import webpush from "web-push";

config({ path: "../.env", encoding: "utf8" });
const backendPortNumber = "5000";
const serverUrl = "http://localhost:" + backendPortNumber + "/";

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: process.env.REACT_APP_WEB_PUSH_PUBLIC_KEY,
  privateKey: process.env.REACT_APP_WEB_PUSH_PRIVATE_KEY,
};

webpush.setVapidDetails("mailto:s0n9h2@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", async (time) => {
  await axios.get(serverUrl + "subscribe/push-supplements", { params: { time: time } }).catch((error) => {
    console.log(error);
  });
  rl.close();
});

rl.on("close", () => {
  process.exit();
});
