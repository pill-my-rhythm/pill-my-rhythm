import webpush from "web-push";
import { AES } from "crypto-js";
import { Subscribe } from "../db/Subscribe";
import { Schedule } from "../db/Schedule";
import { pushData } from "../interfaces/subscribeInput";
import { HttpException } from "../utils/error-util";
import { makeChecklistToken, makeResubscribeToken } from "../utils/jwt-util";
import { emailUtil } from "../utils/emailUtil";

const SubscribeService = {
  pushSupplementSchedules: async (time: Date) => {
    const supplementSchedulesDataArray = await Schedule.findByOnlyTime(time);
    supplementSchedulesDataArray.forEach(async (scheduleData: any) => {
      const supplementArray: string[] = [];
      for (const supplement of scheduleData.User.DailySupplements) {
        supplementArray.push(supplement.Supplement.name);
      }

      // Today's Checklist 페이지에 쓸 refresh token(만료 기간 하루) 발급
      const checklistToken = makeChecklistToken({
        userId: scheduleData.User["pk_user_id"],
      });

      const pushData: pushData = {
        name: scheduleData.User["user_name"],
        when: scheduleData.to_do,
        supplements: supplementArray.join(", "),
        jwtToken: checklistToken,
      };

      const secretKey: any = process.env.SECRET_KEY;

      const notificationData = {
        messageType: "supplement",
        title: `${pushData.name}님, ${pushData.when} 영양제 드실 시간이에요!`,
        body: `${pushData.supplements} 영양제를 복용해주세요.`,
        encryptedToken: AES.encrypt(pushData.jwtToken, secretKey).toString(),
      };

      const subscriptionArray = scheduleData.User.Subscribes;

      for (const subscription of subscriptionArray) {
        try {
          await webpush.sendNotification(
            subscription.device_token,
            JSON.stringify(notificationData)
          );
        } catch (error) {
          // 사용자 토큰 만료되면 에러 발생
          if (error instanceof Error) {
            // DB에서 만료된 기기 정보 삭제 후 메일 전송하기
            await Subscribe.delete(subscription.device_token);

            const resubscribeToken = makeResubscribeToken({
              userId: scheduleData.User["pk_user_id"],
            });
            const emailData = {
              user_name: scheduleData.User["user_name"],
              email: scheduleData.User["email"],
              encryptedToken: AES.encrypt(
                resubscribeToken,
                secretKey
              ).toString(),
            };
            await emailUtil.expirationEmail(emailData);

            throw new HttpException(
              500,
              `사용자 ${scheduleData.User["pk_user_id"]}의 토큰 정보가 만료되어 삭제 후 재갱신 메일을 전송했습니다.`
            );
          }
        }
      }
    });

    return supplementSchedulesDataArray;
  },
};

export { SubscribeService };
