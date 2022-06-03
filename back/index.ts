import app from './src/app';
import { sequelize } from './src/db/index';

import { createServer } from 'http';

const port: number = Number(process.env.PORT) || 5001;

const server = createServer(app);

server.listen(port, async () => {
  console.log(`${port}포트 서버 대기 중!`);

  await sequelize
    .authenticate()
    .then(async () => {
      console.log('connection success');
    })
    .catch((e: Error) => {
      console.log('TT : ', e);
    });
});

export default server;
