import { Op } from "./models";
import { BookMarks } from "./models/bookMark";
import { Users } from "./models/user";
import { IBookMarkCreateInput } from "../interfaces/bookMarkInput";

const BookMark = {
  findById: async (fk_user_id: string) => {
    const schedule = await BookMarks.findAll({ include: { model: Users, where: { pk_user_id: fk_user_id } } });
    return schedule;
  },
  createBookMark: async (data: IBookMarkCreateInput) => {
    const newBookMark = await BookMarks.create(data);
    return newBookMark;
  },
};

export { BookMark };
