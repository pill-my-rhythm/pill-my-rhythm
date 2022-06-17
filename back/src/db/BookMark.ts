import { Op } from "./models";
import { BookMarks } from "./models/bookMark";
import { Users } from "./models/user";

const BookMark = {
  findById: async (fk_user_id: string) => {
    const schedule = await BookMarks.findAll({ include: { model: Users, where: { pk_user_id: fk_user_id } } });
    return schedule;
  },
  //   createBookMark: async () => {
  //     const bookmark = await BookMarks.create(bookmark);
  //     return bookmarks;
  //   },
};

export { BookMark };
