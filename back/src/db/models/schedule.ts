import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Users } from "./user";

// These are all the attributes in the User model

interface SchedulesAttributes {
  pk_schedule_id?: number;
  type: string;
  start: Date;
  finish: Date;
  to_do: string;
}

export class Schedules extends Model<SchedulesAttributes> {
  pk_schedule_id?: number;
  type: string;
  start: Date;
  finish: Date;
  to_do: string;
}

Schedules.init(
  {
    pk_schedule_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("B", "S"),
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finish: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    to_do: {
      type: DataTypes.STRING(50),
      allowNull: true,
      get() {
        const to_do = this.getDataValue("to_do");
        switch (to_do) {
          case "B":
            return "아침";
          case "L":
            return "점심";
          case "D":
            return "저녁";
          default:
            return to_do;
        }
      },
    },
  },
  {
    sequelize,
    modelName: "Schedules",
    tableName: "tb_schedule",
    freezeTableName: true,
    timestamps: true,
    paranoid: true, // 삭제일 (복구용)
    underscored: true,
    indexes: [
      { name: "IDX_type", using: "BTREE", fields: ["type"] },
      { name: "IDX_start_finish", using: "BTREE", fields: ["start", "finish"] },
    ],
  },
);

Users.hasMany(Schedules, { foreignKey: { name: "fk_user_id", allowNull: false } });
Schedules.belongsTo(Users, { foreignKey: { name: "fk_user_id", allowNull: false } });
