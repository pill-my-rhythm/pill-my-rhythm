import { Subscribe } from "../db/Subscribe";
import { HttpException } from "../utils/error-util";
import { ISendNotificationInput, pushData } from "../interfaces/subscribeInput";
import webpush from "web-push";
import { Schedule } from "../db/Schedule";

const SubscribeService = {
  createSubscription: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribe.findByUserAndDevice(fk_user_id, device_token);
    if (subscription) {
      throw new HttpException(401, "이미 구독 신청을 한 기기입니다.");
    }
    const newSubscriptionData = { fk_user_id, device_token };
    const newSubscription = await Subscribe.create(newSubscriptionData);
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
    const supplementSchedulesDataArray: any = await Schedule.findByOnlyTime(time);
    supplementSchedulesDataArray.forEach(async (scheduleData: any) => {
      const supplementArray: string[] = [];
      for (const supplement of scheduleData.User.DailySupplements) {
        supplementArray.push(supplement.Supplement.name);
      }

      const pushData: pushData = {
        user_name: scheduleData.User["user_name"],
        to_do: scheduleData.to_do,
        supplements: supplementArray.join(),
      };
      console.log(pushData);

      const notificationData = {
        title: "Pill my rhythm",
        body: `${pushData.user_name}님, ${pushData.to_do} 영양제 드실 시간이에요!\n ${pushData.supplements} 영양제를 복용해주세요.`,
      };
      const deviceToken: any = {
        keys: {
          auth: "xQMwB8tlfWzRUMMJFPpSnA",
          p256dh: "BC4SjIP-vG6PIC_g9eYRzQYvSxdXWvd2ethQ-T_3XIc7maENsxkXl9VBk3SANpRasduN2KuWmjeWoRciU41ZQ7c",
        },
        endpoint:
          "https://fcm.googleapis.com/fcm/send/dedvLG7BGYc:APA91bEwZ6rZaZQ9qApc7xrIUPHfPp2OWcRIum-V5czhZNkfXKkEqvHM3hAhP443MdWR-jmLhZ9HkWRz2uMY2OALVInewsFxrL3FWIjv_JINOOMFKIGVsCDGbxEiaNIQEGojXrH0KzSV",
        expirationTime: null,
      };
      webpush.sendNotification(deviceToken, JSON.stringify(notificationData)).catch((error) => {
        console.error(error);
        throw new HttpException(500, error);
      });
    });

    return supplementSchedulesDataArray;
  },

  deleteSubscription: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribe.findByUserAndDevice(fk_user_id, device_token);
    if (!subscription) {
      throw new HttpException(401, "구독 정보가 없는 기기입니다.");
    }

    const unsubscription = await Subscribe.delete(device_token);
    return unsubscription;
  },
};

export { SubscribeService };
