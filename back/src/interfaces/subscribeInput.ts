export interface ISubscriptionInput {
  fk_user_id: string;
  device_token: ISendNotificationInput;
}

export interface ISendNotificationInput {
  endpoint: string;
  expirationTime?: any;
  keys: { p256dh: string; auth: string };
}
