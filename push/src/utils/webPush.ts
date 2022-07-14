import axios from 'axios';
import webpush from 'web-push';
import schedule from 'node-schedule';
import moment from 'moment';
import 'moment-timezone';
import { logger } from '../utils/winston';
import { emailUtil } from '../utils/emailUtil';

moment.tz.setDefault('Asia/Seoul'); // 로그 시간대 한국 기준으로 변경

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: <any>process.env.PUBLIC_KEY,
  privateKey: <any>process.env.PRIVATE_KEY,
};

export default (): void => {
  webpush.setVapidDetails('mailto:s0n9h2@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);
};

// 배포하면 주소 변경해야 함
// const serverUrl = "http://localhost:5004/";
const serverUrl = 'https://kdt-ai4-team17.elicecoding.com/push/';

const push = async (time: Date) => {
  try {
    console.log(serverUrl + 'subscribe/push-supplements');
    await axios
      .get(serverUrl + 'subscribe/push-supplements', {
        params: { time: time },
      })
      .then(res => {
        console.log(res);
        const pushResultObj = {
          status: res.status,
          statusText: res.statusText,
          data: res.data,
        };

        // 푸시 알림 발송 성공하면 push.log에 기록
        if (res.status == 200) {
          logger.info(`${time}`, pushResultObj);
          console.log(`${time}에 설정된 푸시 알림을 전송했습니다.`);
        }
      });
  } catch (error: any) {
    const pushErrorObj = {
      syscall: error.syscall,
      code: error.code,
      errno: error.errno,
    };

    // 푸시 알림 발송 실패하면 error.log에 기록
    logger.error(`${time}`, pushErrorObj);
    console.log(`${time}에 설정된 푸시 알림 전송에 실패했습니다.`);
    console.log(error);

    const data = {
      developers: ['s0n9h2@gmail.com', 'tbr06057@naver.com'],
      time: time,
      errorContent: pushErrorObj,
    };

    // 담당 개발자들에게 이메일 전송
    emailUtil.pushErrorEmail(data);
  }
};

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(0, 6); // 매일
rule.hour = [0, new schedule.Range(6, 23)]; // 오전 6시부터 자정까지
rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // 정각과 30분에
rule.tz = 'Asia/Seoul'; // 한국 시간 기준

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const job = schedule.scheduleJob(rule, () => {
  const current = new Date();
  push(current);
});
