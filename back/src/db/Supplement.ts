import { Supplements } from "./models/supplement";

const Supplement = {
  getAllSupplements: async (pageNum: number) => {
    let offset = 0;
    if (pageNum > 1) {
      offset = 15 * (pageNum - 1);
    }
    const supplements = await Supplements.findAll({
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
    return supplements;
  },
};

export { Supplement };
