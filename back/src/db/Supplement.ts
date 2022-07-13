import { Op } from "./models";
import { Supplements } from "./models/supplement";

const Supplement = {
  getAllSupplements: async (pageNum: number, search_name: string, search_raw: string) => {
    let offset = 0;
    if (pageNum > 1) {
      offset = 15 * (pageNum - 1);
    }

    let supplements;
    if (search_name == undefined && search_raw == undefined) {
      supplements = await Supplements.findAll({
        // pagination
        offset: offset,
        limit: 15,
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
      });
    } else if (search_name !== undefined) {
      supplements = await Supplements.findAll({
        where: {
          name: {
            [Op.like]: "%" + search_name + "%",
          },
        },
        // pagination
        offset: offset,
        limit: 15,
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
      });
    } else if (search_raw !== undefined) {
      supplements = await Supplements.findAll({
        where: {
          name: {
            [Op.like]: "%" + search_raw + "%",
          },
        },
        // pagination
        offset: offset,
        limit: 15,
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
      });
    }

    return supplements;
  },
};

export { Supplement };
