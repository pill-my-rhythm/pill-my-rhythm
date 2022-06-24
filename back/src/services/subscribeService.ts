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

    const notificationData = {
      title: "Pill my rhythm",
      body: "영양제 스케줄 알림 기능을 활성화합니다.",
    };
    webpush.sendNotification(device_token, JSON.stringify(notificationData)).catch((error) => {
      console.error(error);
      throw new HttpException(500, error);
    });
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
    const supplementSchedulesDataArray = await Schedule.findByOnlyTime(time);
    supplementSchedulesDataArray.forEach(async (scheduleData: any) => {
      const supplementArray: string[] = [];
      for (const supplement of scheduleData.User.DailySupplements) {
        supplementArray.push(supplement.Supplement.name);
      }

      const pushData: pushData = {
        name: scheduleData.User["user_name"],
        when: scheduleData.to_do,
        supplements: supplementArray.join(", "),
      };

      const notificationData = {
        title: `${pushData.name}님, ${pushData.when} 영양제 드실 시간이에요!`,
        body: `${pushData.supplements} 영양제를 복용해주세요.`,
        // TODO: 변경해야 함
        jwtToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YzAzNDlmMS1lMGI3LTQ1YmMtODUxNS01MDU2N2M4N2EyMmMiLCJpYXQiOjE2NTYwNTAxNTEsImV4cCI6MTY1NjA1Mzc1MX0.QZoBj-Ig1gXVdWE_Q0Mc67ZdpR5TtrV-gVpXiDXbhZQ",
      };

      const subscriptionArray = scheduleData.User.Subscribes;
      for (const subscription of subscriptionArray) {
        webpush.sendNotification(subscription.device_token, JSON.stringify(notificationData)).catch((error) => {
          console.error(error);
          throw new HttpException(500, error);
        });
      }
    });

    return supplementSchedulesDataArray;
  },

  deleteSubscription: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribe.findByUserAndDevice(fk_user_id, device_token);
    if (!subscription) {
      throw new HttpException(401, "구독 정보가 없는 기기입니다.");
    }

    const notificationData = {
      title: "Pill my rhythm",
      body: "영양제 스케줄 알림 기능을 더이상 구독하지 않습니다.",
    };
    webpush.sendNotification(device_token, JSON.stringify(notificationData)).catch((error) => {
      console.error(error);
      throw new HttpException(500, error);
    });

    const unsubscription = await Subscribe.delete(device_token);
    return unsubscription;
  },
};

export { SubscribeService };
