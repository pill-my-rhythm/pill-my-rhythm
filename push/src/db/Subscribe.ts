import { Subscribes } from "./models/subscribe";
import { ISendNotificationInput } from "../interfaces/subscribeInput";
import { Users } from "./models/user";

const Subscribe = {
  delete: async (device_token: ISendNotificationInput) => {
    const unsubscription = await Subscribes.destroy({
      where: { device_token },
    });

    return unsubscription;
  },
};

export { Subscribe };
