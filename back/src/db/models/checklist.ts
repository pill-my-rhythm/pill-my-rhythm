import { DataTypes, Model } from "sequelize";
import { Users } from "./user";
import sequelize from "./index";

// These are all the attributes in the User model

interface ChecklistAttributes {
  pk_checklist_id: number;
  date: Date;
  level?: number;
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
  five: boolean;
  six: boolean;
}

export class Checklist extends Model<ChecklistAttributes> {
  pk_checklist_id: number;
  date: Date;
  level?: number;
  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
  five: boolean;
  six: boolean;
}

Checklist.init(
  {
    pk_checklist_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    one: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    two: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    three: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    four: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    five: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    six: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Checklist",
    tableName: "tb_checklist",
    freezeTableName: true,
    timestamps: true,
    paranoid: true, // 삭제일 (복구용)
    underscored: true,
  },
);

Users.hasMany(Checklist, { foreignKey: { name: "fk_user_id", allowNull: false } });
Checklist.belongsTo(Users, { foreignKey: { name: "fk_user_id", allowNull: false } });
