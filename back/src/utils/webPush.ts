import webpush from "web-push";
// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: <any>process.env.PUBLIC_KEY,
  privateKey: <any>process.env.PRIVATE_KEY,
};

export default (): void => {
  webpush.setVapidDetails("mailto:s0n9h2@gmail.com", vapidKeys.publicKey, vapidKeys.privateKey);
};
