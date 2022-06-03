import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'team17', // 데이터베이스 이름
  'super', // 유저 명
  'qwer1234', // 비밀번호
  {
    host: '144.24.65.207', // 데이터베이스 호스트
    port: 3306,
    dialect: 'mysql', // 사용할 데이터베이스 종류
  }
);

export { sequelize };
