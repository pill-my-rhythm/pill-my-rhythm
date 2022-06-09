import { DataTypes, Model } from "sequelize";
import { Users } from "./user";
import { Supplements } from "./supplement";
import sequelize from "./index";

// These are all the attributes in the DailySupplements model

interface DailySupplementAttributes {
  pk_plan_id: number;
  type: string;
}

export class DailySupplements extends Model<DailySupplementAttributes> {
  pk_plan_id: number;
  type: string;
}

DailySupplements.init(
  {
    pk_plan_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("B", "L", "D"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "DailySupplements",
    tableName: "tb_daily_supplement",
    freezeTableName: true,
    timestamps: true,
    paranoid: true, // 삭제일 (복구용)
    underscored: true,
  },
);

Supplements.belongsToMany(Users, {
  through: DailySupplements,
  foreignKey: { name: "fk_supplement_id", allowNull: false },
});
Users.belongsToMany(Supplements, {
  through: DailySupplements,
  foreignKey: { name: "fk_user_id", allowNull: false },
});
