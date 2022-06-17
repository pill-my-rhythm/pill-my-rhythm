import { Subscribes } from "./models/subscribe";
import { ISendNotificationInput } from "../interfaces/subscribeInput";

const Subscribe = {
  findByUserAndDevice: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribes.findOne({ where: { fk_user_id, device_token } });
    console.log(subscription);
    return subscription;
  },

  create: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const newSubscription = await Subscribes.create({ fk_user_id, device_token });
    return newSubscription;
  },

  findByUserId: async (fk_user_id: string) => {
    const devicesArray = await Subscribes.findAll({ where: { fk_user_id } });
    return devicesArray;
  },
};

export { Subscribe };
