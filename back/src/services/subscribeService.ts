import { Subscribe } from "../db/Subscribe";
import { HttpException } from "../utils/error-util";

const SubscribeService = {
  createSubscription: async (fk_user_id: string, device_token: JSON) => {
    const subscription = await Subscribe.findByUserId(fk_user_id, device_token);
    if (subscription) {
      throw new HttpException(401, "이미 구독 신청을 한 기기입니다.");
    }

    const newSubscription = await Subscribe.create(fk_user_id, device_token);
    return newSubscription;
  },
};

export { SubscribeService };
