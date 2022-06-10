// ./node_modules/.bin/ts-node .\src\db\migrations\4.create-table-supplement.ts

import { Supplements } from "../models/supplement";

console.log("======Create supplement Table======");
const create_table_supplement = async () => {
  await Supplements.sync({ force: true })
    .then(() => {
      console.log("✅Success Create supplement Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create supplement Table : ", err);
    });
};

create_table_supplement();
