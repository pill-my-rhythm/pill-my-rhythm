import { Subscribe } from "../db/Subscribe";
import { HttpException } from "../utils/error-util";
import { ISendNotificationInput } from "../interfaces/subscribeInput";
import webpush from "web-push";
import { Schedule } from "../db/Schedule";
import { DailySupplement } from "../db/DailySupplement";

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

  pushSupplementSchedules: async (time: Date) => {
    const supplementSchedules = await Schedule.findByOnlyTime(time);
    supplementSchedules.forEach(async (schedule) => {
      const dailySupplement = await DailySupplement.findByIdAndToDo(schedule);
      dailySupplement.forEach((element) => {
        console.log(element);
      });
      console.log(dailySupplement.values());
    });

    return supplementSchedules;
  },

  deleteSubscription: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribe.findByUserAndDevice(fk_user_id, device_token);
    if (!subscription) {
      throw new HttpException(401, "구독 정보가 없는 기기입니다.");
    }

    const unsubscription = await Subscribe.delete(fk_user_id, device_token);
    return unsubscription;
  },
};

export { SubscribeService };
