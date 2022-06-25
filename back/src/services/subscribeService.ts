import webpush from "web-push";
import { AES } from "crypto-js";
import { Subscribe } from "../db/Subscribe";
import { ISendNotificationInput, pushData } from "../interfaces/subscribeInput";
import { Schedule } from "../db/Schedule";
import { HttpException } from "../utils/error-util";
import { makeChecklistToken } from "../utils/jwt-util";
import { Response } from "express";

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

      // TODO: Today's Checklist 페이지에 쓸 refresh token(만료 기간 하루) 발급 + redis 저장
      const checklistToken = makeChecklistToken({ userId: scheduleData.User["pk_user_id"] });
      // redisClient.SETEX(`checklist-${time}-${scheduleData.User["pk_user_id"]}`, 86400, checklistToken);

      const pushData: pushData = {
        name: scheduleData.User["user_name"],
        when: scheduleData.to_do,
        supplements: supplementArray.join(", "),
        jwtToken: checklistToken,
      };

      // const jwtToken =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YzAzNDlmMS1lMGI3LTQ1YmMtODUxNS01MDU2N2M4N2EyMmMiLCJpYXQiOjE2NTYwODU2NjUsImV4cCI6MTY1NjA4OTI2NX0.OKXodtjnvs_wPt3qi3IZ4UmYXoPEa_9PJuH5VjpyF5s";

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
            // DB에서 만료된 기기 정보 삭제 (후 메일 전송하기)
            await Subscribe.delete(subscription.device_token);
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
