export interface ISendNotificationInput {
  endpoint: string;
  expirationTime?: any;
  keys: { p256dh: string; auth: string };
}

export interface pushData {
  user_name: string;
  to_do: string;
  supplements: string;
}
