// ./node_modules/.bin/ts-node ./src/db/migrations/5.create-table-daily-supplement

import { DailySupplements } from "../models/dailySupplement";

console.log("======Create daily supplement Table======");
const create_table_daily_supplement = async () => {
  await DailySupplements.sync({ force: true })
    .then(() => {
      console.log("✅Success Create daily supplement Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create daily supplement Table : ", err);
    });
};

create_table_daily_supplement();
