import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { ISendNotificationInput } from "../../interfaces/subscribeInput";

// These are all the attributes in the User model

interface SubscribesAttributes {
  pk_subscribe_id: number;
  fk_user_id: string;
  device_token: ISendNotificationInput;
}

export class Subscribes extends Model<SubscribesAttributes> {
  pk_subscribe_id: number;
  fk_user_id: string;
  device_token: ISendNotificationInput;
}

Subscribes.init(
  {
    pk_subscribe_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fk_user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    device_token: {
      type: DataTypes.JSON,
      allowNull: false,
      // 데이터 조회시 후처리
      // get() {
      //   return JSON.parse(this.getDataValue("device_token"));
      // },
      // 데이터 입력시 전처리
      // set(value) {
      //   this.setDataValue("device_token", JSON.stringify(value));
      // },
    },
  },
  {
    sequelize,
    modelName: "Subscribes",
    tableName: "tb_subscribe",
    freezeTableName: true,
    timestamps: true,
    paranoid: true, // 삭제일 (복구용)
    underscored: true,
  },
);
