// ./node_modules/.bin/ts-node .\src\db\migrations\2.create-table-schedules.ts

import { Schedules } from "../models/schedule";

console.log("======Create schedules Table======");
const create_table_schedules = async () => {
  await Schedules.sync({ force: true })
    .then(() => {
      console.log("✅Success Create schedules Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create schedules Table : ", err);
    });
};

create_table_schedules();
