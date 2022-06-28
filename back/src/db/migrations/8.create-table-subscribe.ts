// ./node_modules/.bin/ts-node .\src\db\migrations\8.create-table-subscribe.ts

import { Subscribes } from "../models/subscribe";

console.log("======Create subscribe Table======");
const create_table_subscribe = async () => {
  await Subscribes.sync({ force: true })
    .then(() => {
      console.log("✅Success Create subscribe Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create subscribe Table : ", err);
    });
};

create_table_subscribe();
