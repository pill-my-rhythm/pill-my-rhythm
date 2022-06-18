import webpush from "web-push";

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

export default (): void => {
  webpush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);
};

// const webPush = async (deviceToken: ISendNotificationInput) => {
//   await webpush.sendNotification(deviceToken, "Test Push Notification").catch((error) => {
//     throw new HttpException(500, error);
//   });
// };
