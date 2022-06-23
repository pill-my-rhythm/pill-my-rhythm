import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { Users } from "./user";
import { Supplements } from "./supplement";

// These are all the attributes in the BookMarks model

interface BookMarksAttributes {
  pk_bookmark_id?: number;
}

export class BookMarks extends Model<BookMarksAttributes> {
  pk_bookmark_id?: number;
}

BookMarks.init(
  {
    pk_bookmark_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BookMarks",
    tableName: "tb_bookmark",
    freezeTableName: true,
    timestamps: true,
    paranoid: true, // 삭제일 (복구용)
    underscored: true,
  },
);

BookMarks.belongsTo(Users, { foreignKey: { name: "fk_user_id", allowNull: false } });
BookMarks.belongsTo(Supplements, { foreignKey: { name: "fk_supplement_id", allowNull: false } });
