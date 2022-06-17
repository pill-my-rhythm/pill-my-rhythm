import { Subscribe } from "../db/Subscribe";
import { HttpException } from "../utils/error-util";
import { ISendNotificationInput } from "../interfaces/subscribeInput";
import webPush from "../utils/webPush";

const SubscribeService = {
  createSubscription: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribe.findByUserAndDevice(fk_user_id, device_token);
    if (subscription) {
      throw new HttpException(401, "이미 구독 신청을 한 기기입니다.");
    }

    const newSubscription = await Subscribe.create(fk_user_id, device_token);
    return newSubscription;
  },

  sendPushNotification: async (fk_user_id: string) => {
    const devicesArray = await Subscribe.findByUserId(fk_user_id);

    devicesArray.forEach((element) => {
      webPush(element.getDataValue("device_token"));
    });

    return devicesArray;
  },
};

export { SubscribeService };
