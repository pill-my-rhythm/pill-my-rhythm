import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Users } from "./user";
import { ISendNotificationInput } from "../../interfaces/subscribeInput";

// These are all the attributes in the User model

interface SubscribesAttributes {
  pk_subscribe_id: number;
  device_token: ISendNotificationInput;
}

export class Subscribes extends Model<SubscribesAttributes> {
  pk_subscribe_id!: number;
  device_token!: ISendNotificationInput;
}

Subscribes.init(
  {
    pk_subscribe_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  }
);

Users.hasMany(Subscribes, {
  foreignKey: { name: "fk_user_id", allowNull: false },
});
Subscribes.belongsTo(Users, {
  foreignKey: { name: "fk_user_id", allowNull: false },
});
