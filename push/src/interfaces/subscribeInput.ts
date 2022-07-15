export interface ISendNotificationInput {
  endpoint: string;
  expirationTime?: any;
  keys: { p256dh: string; auth: string };
}

export interface pushData {
  name: string;
  when: string;
  supplements: string;
  jwtToken: string;
}
