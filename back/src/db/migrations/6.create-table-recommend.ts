// ./node_modules/.bin/ts-node .\src\db\migrations\6.create-table-recommend.ts

import { Recommends } from "../models/recommend";

console.log("======Create supplement Table======");
const create_table_recommend = async () => {
  await Recommends.sync({ force: true })
    .then(() => {
      console.log("✅Success Create supplement Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create supplement Table : ", err);
    });
};

create_table_recommend();
