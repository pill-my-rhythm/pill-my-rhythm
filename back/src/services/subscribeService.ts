import webpush from "web-push";
import { AES } from "crypto-js";
import { Subscribe } from "../db/Subscribe";
import { ISendNotificationInput, pushData } from "../interfaces/subscribeInput";
import { Schedule } from "../db/Schedule";
import { HttpException } from "../utils/error-util";
import { makeChecklistToken, makeResubscribeToken } from "../utils/jwt-util";
import { emailUtil } from "../utils/emailUtil";

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

  pushSupplementSchedules: async (time: Date) => {
    const supplementSchedulesDataArray = await Schedule.findByOnlyTime(time);
    supplementSchedulesDataArray.forEach(async (scheduleData: any) => {
      const supplementArray: string[] = [];
      for (const supplement of scheduleData.User.DailySupplements) {
        supplementArray.push(supplement.Supplement.name);
      }

      // Today's Checklist 페이지에 쓸 refresh token(만료 기간 하루) 발급
      const checklistToken = makeChecklistToken({ userId: scheduleData.User["pk_user_id"] });

      const pushData: pushData = {
        name: scheduleData.User["user_name"],
        when: scheduleData.to_do,
        supplements: supplementArray.join(", "),
        jwtToken: checklistToken,
      };

      const secretKey = process.env.SECRET_KEY;

      const notificationData = {
        messageType: "supplement",
        title: `${pushData.name}님, ${pushData.when} 영양제 드실 시간이에요!`,
        body: `${pushData.supplements} 영양제를 복용해주세요.`,
        encryptedToken: AES.encrypt(pushData.jwtToken, secretKey).toString(),
      };

      const subscriptionArray = scheduleData.User.Subscribes;

      for (const subscription of subscriptionArray) {
        try {
          await webpush.sendNotification(subscription.device_token, JSON.stringify(notificationData));
        } catch (error) {
          // 사용자 토큰 만료되면 에러 발생
          if (error instanceof Error) {
            // DB에서 만료된 기기 정보 삭제 후 메일 전송하기
            await Subscribe.delete(subscription.device_token);

            const resubscribeToken = makeResubscribeToken({ userId: scheduleData.User["pk_user_id"] });
            const emailData = {
              user_name: scheduleData.User["user_name"],
              email: scheduleData.User["email"],
              encryptedToken: AES.encrypt(resubscribeToken, secretKey).toString(),
            };
            await emailUtil.expirationEmail(emailData);
          }
        }
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
