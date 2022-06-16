// ./node_modules/.bin/ts-node .\src\db\migrations\7.create-table-bookmark.ts

import { BookMarks } from "../models/bookmark";

console.log("======Create bookmark Table======");
const create_table_bookmark = async () => {
  await BookMarks.sync({ force: true })
    .then(() => {
      console.log("✅Success Create bookmark Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create bookmark Table : ", err);
    });
};

create_table_bookmark();
