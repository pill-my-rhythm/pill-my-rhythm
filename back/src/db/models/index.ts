import { Sequelize } from "sequelize";
import config from "../config/config";

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: "mysql",
  timezone: "+09:00",
  dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
  define: {
    timestamps: true,
  },
});

export default sequelize;
