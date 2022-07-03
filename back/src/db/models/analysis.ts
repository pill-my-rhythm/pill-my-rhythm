import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

interface AnalysisAttributes {
  pk_analysis_id?: number;
  keyword: string;
  gender: string;
  age: string;
  name: string;
  link: string;
  img_link: string;
}

export class Analysis extends Model<AnalysisAttributes> {
  pk_analysis_id?: number;
  keyword: string;
  gender: string;
  age: string;
  name: string;
  link: string;
  img_link: string;
}

Analysis.init(
  {
    pk_analysis_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    keyword: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("f", "m"),
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    img_link: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Analysis",
    tableName: "tb_analysis",
    freezeTableName: true,
  },
);
