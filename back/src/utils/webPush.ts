import webpush from "web-push";
import { ISendNotificationInput } from "../interfaces/subscribeInput";

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};
webpush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);

const webPush = async (deviceToken: ISendNotificationInput) => {
  const push = await webpush.sendNotification(deviceToken, "Test Push Notification");
  return push;
};

export default webPush;
