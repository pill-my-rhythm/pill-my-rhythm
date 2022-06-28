// ./node_modules/.bin/ts-node .\src\db\migrations\9.create-table-analysis.ts

import { Analysis } from "../models/analysis";

console.log("======Create analysis Table======");
const create_table_analysis = async () => {
  await Analysis.sync({ force: true })
    .then(() => {
      console.log("✅Success Create analysis Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create analysis Table : ", err);
    });
};

create_table_analysis();
