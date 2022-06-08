import { Users } from "./models/user";

const User = {
  findByEmail: async (email: string) => {
    const user = await Users.findOne({ where: { email: email } });

    return user;
  },
};

export { User };
