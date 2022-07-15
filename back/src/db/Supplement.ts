import { Op } from "./models";
import { Supplements } from "./models/supplement";

const Supplement = {
  getAllSupplements: async (pageNum: number, search_name: string, search_raw: string) => {
    let offset = 0;
    if (pageNum > 1) {
      offset = 16 * (pageNum - 1);
    }

    let supplements;
    let totalCount;
    if (search_name == undefined && search_raw == undefined) {
      totalCount = await Supplements.count();

      supplements = await Supplements.findAll({
        // pagination
        offset: offset,
        limit: 16,
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
      totalCount = await Supplements.count({
        where: {
          name: {
            [Op.like]: "%" + search_name + "%",
          },
        },
      });

      supplements = await Supplements.findAll({
        where: {
          name: {
            [Op.like]: "%" + search_name + "%",
          },
        },
        // pagination
        offset: offset,
        limit: 16,
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
      totalCount = await Supplements.count({
        where: {
          name: {
            [Op.like]: "%" + search_raw + "%",
          },
        },
      });

      supplements = await Supplements.findAll({
        where: {
          name: {
            [Op.like]: "%" + search_raw + "%",
          },
        },
        // pagination
        offset: offset,
        limit: 16,
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

    const result = { supplements, totalCount };
    return result;
  },
};

export { Supplement };
