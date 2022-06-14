import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

// These are all the attributes in the User model

interface SupplementsAttributes {
  pk_supplement_id?: number;
  update_date: number;
  shape: string;
  name: string;
  caution: string;
  company: string;
  function: string;
  how_to_eat: string;
  raw: string;
  img_link: string;
  link: string;
}

export class Supplements extends Model<SupplementsAttributes> {
  pk_supplement_id?: number;
  update_date: number;
  shape: string;
  name: string;
  caution: string;
  company: string;
  function: string;
  how_to_eat: string;
  raw: string;
  img_link: string;
  link: string;
}

Supplements.init(
  {
    pk_supplement_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    update_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shape: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    caution: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    function: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    how_to_eat: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    raw: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    img_link: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Supplements",
    tableName: "tb_supplement",
    freezeTableName: true,
  },
);
