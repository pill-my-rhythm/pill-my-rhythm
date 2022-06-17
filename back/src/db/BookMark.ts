import { Op } from "./models";
import { Users } from "./models/user";
import { BookMarks } from "./models/bookMark";
import { Supplements } from "./models/supplement";
import { IBookMarkCreateInput } from "../interfaces/bookMarkInput";

const BookMark = {
  findById: async (fk_user_id: string) => {
    const schedule = await BookMarks.findAll({
      include: [
        { model: Users, attributes: [], where: { pk_user_id: fk_user_id } },
        {
          model: Supplements,
          attributes: [
            "pk_supplement_id",
            "update_date",
            "shape",
            "name",
            "caution",
            "company",
            "function",
            "how_to_eat",
            "raw",
            "img_link",
            "link",
          ],
        },
      ],
    });
    return schedule;
  },
  createBookMark: async (data: IBookMarkCreateInput) => {
    const newBookMark = await BookMarks.create(data);
    return newBookMark;
  },
};

export { BookMark };
