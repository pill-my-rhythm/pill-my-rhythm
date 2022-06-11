// ./node_modules/.bin/ts-node ./src/db/migrations/3.create-table-checklist.ts
// 실행시키면 table 생성됨
// 실행시킬 수 없다고 나올 땐 https://cobee.tistory.com/entry/TypeScript%EC%98%A4%EB%A5%98-tsc-%EC%9D%B4-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%97%90%EC%84%9C-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%8B%A4%ED%96%89%ED%95%A0-%EC%88%98-%EC%97%86%EC%9C%BC%EB%AF%80%EB%A1%9C-%EB%B3%B4%EC%95%88-%EC%98%A4%EB%A5%98

import { Checklists } from "../models/checklist";

console.log("======Create checklist Table======");
const create_table_checklist = async () => {
  await Checklists.sync({ force: true })
    .then(() => {
      console.log("✅Success Create checklist Table");
    })
    .catch((err: Error) => {
      console.log("❗️Error in Create users Table : ", err);
    });
};

create_table_checklist();
