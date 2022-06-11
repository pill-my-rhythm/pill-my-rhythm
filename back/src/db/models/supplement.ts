import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

// These are all the attributes in the User model

interface SupplementsAttributes {
  pk_supplement_id?: number;
}

export class Supplements extends Model<SupplementsAttributes> {
  pk_supplement_id?: number;
}

Supplements.init(
  {
    pk_supplement_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Supplements",
    tableName: "tb_supplement",
    freezeTableName: true,
    timestamps: true,
    paranoid: true, // 삭제일 (복구용)
    underscored: true,
  },
);
