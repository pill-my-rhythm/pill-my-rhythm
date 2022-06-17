import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

// These are all the attributes in the User model

interface SubscribesAttributes {
  pk_subscribe_id: number;
  fk_user_id: string;
  device_token: JSON;
}

export class Subscribes extends Model<SubscribesAttributes> {
  pk_subscribe_id: number;
  fk_user_id: string;
  device_token: JSON;
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
