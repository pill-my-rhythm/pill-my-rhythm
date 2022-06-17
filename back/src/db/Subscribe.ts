import { Subscribes } from "./models/subscribe";

const Subscribe = {
  findByUserId: async (fk_user_id: string, device_token: JSON) => {
    const subscription = await Subscribes.findOne({ where: { fk_user_id, device_token } });
    return subscription;
  },

  create: async (fk_user_id: string, device_token: JSON) => {
    const newSubscription = await Subscribes.create({ fk_user_id, device_token });
    return newSubscription;
  },
};

export { Subscribe };
