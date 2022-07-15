import webpush from "web-push";
import { Subscribe } from "../db/Subscribe";
import { ISendNotificationInput } from "../interfaces/subscribeInput";
import { HttpException } from "../utils/error-util";

const SubscribeService = {
  createSubscription: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribe.findByUserAndDevice(fk_user_id, device_token);
    if (subscription) {
      throw new HttpException(401, "이미 구독 신청을 한 기기입니다.");
    }
    const newSubscriptionData = { fk_user_id, device_token };
    const newSubscription = await Subscribe.create(newSubscriptionData);

    const notificationData = {
      messageType: "info",
      title: "Pill my rhythm",
      body: "영양제 스케줄 알림 기능을 활성화합니다.",
    };
    webpush.sendNotification(device_token, JSON.stringify(notificationData)).catch((error) => {
      console.error(error);
      throw new HttpException(500, error);
    });
    return newSubscription;
  },

  getSubscription: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribe.findByUserAndDevice(fk_user_id, device_token);
    return subscription;
  },

  sendPushNotification: async (fk_user_id: string) => {
    const devicesArray = await Subscribe.findByUserId(fk_user_id);

    devicesArray.forEach((subscription) => {
      const deviceToken = subscription.getDataValue("device_token");
      const notificationData = {
        title: "Hey, this is a push notification!",
        body: "Subscribe Pill my rhythm!!!!!!",
      };
      webpush.sendNotification(deviceToken, JSON.stringify(notificationData)).catch((error) => {
        console.error(error);
        throw new HttpException(500, error);
      });
    });

    return devicesArray;
  },

  deleteSubscription: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribe.findByUserAndDevice(fk_user_id, device_token);
    if (!subscription) {
      throw new HttpException(401, "구독 정보가 없는 기기입니다.");
    }

    const notificationData = {
      messageType: "info",
      title: "Pill my rhythm",
      body: "영양제 스케줄 알림 기능을 더이상 구독하지 않습니다.",
    };
    await webpush.sendNotification(device_token, JSON.stringify(notificationData)).catch((error) => {
      console.error(error);
      throw new HttpException(500, error);
    });

    const unsubscription = await Subscribe.delete(device_token);
    return unsubscription;
  },
};

export { SubscribeService };
