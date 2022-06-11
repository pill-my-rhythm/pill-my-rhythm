import { DataTypes, Model } from "sequelize";
import sequelize from "./index";
import { Users } from "./user";
import { Supplements } from "./supplement";

// These are all the attributes in the User model

interface RecommendsAttributes {
  pk_recommend_id?: number;
}

export class Recommends extends Model<RecommendsAttributes> {
  pk_recommend_id?: number;
}

Recommends.init(
  {
    pk_recommend_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Recommends",
    tableName: "tb_recommend",
    freezeTableName: true,
    timestamps: true,
    paranoid: true, // 삭제일 (복구용)
    underscored: true,
  },
);

Supplements.belongsToMany(Users, {
  through: Recommends,
  foreignKey: { name: "fk_supplement_id", allowNull: false },
});
Users.belongsToMany(Supplements, {
  through: Recommends,
  foreignKey: { name: "fk_user_id", allowNull: false },
});
