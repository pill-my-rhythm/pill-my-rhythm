import { Subscribes } from "./models/subscribe";
import { ISubscriptionInput, ISendNotificationInput } from "../interfaces/subscribeInput";
import { Users } from "./models/user";
import { fork } from "child_process";

const Subscribe = {
  findByUserAndDevice: async (fk_user_id: string, device_token: ISendNotificationInput) => {
    const subscription = await Subscribes.findOne({
      where: { device_token },
      include: { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
    });
    return subscription;
  },

  create: async (newSubscriptionData: ISubscriptionInput) => {
    const newSubscription = await Subscribes.create(newSubscriptionData);
    return newSubscription;
  },

  findByUserId: async (fk_user_id: string) => {
    const devicesArray = await Subscribes.findAll({
      include: { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
    });
    return devicesArray;
  },

  delete: async (device_token: ISendNotificationInput) => {
    const unsubscription = await Subscribes.destroy({
      where: { device_token },
    });
    // const unsubscription = await Subscribes.destroy();
    return unsubscription;
  },
};

export { Subscribe };
