import { DataTypes, Model } from "sequelize";
import sequelize from "./index";
import { v4 as uuid } from "uuid";

// These are all the attributes in the User model
interface UsersAttributes {
  pk_user_id: string;
  user_name: string;
  email: string;
  password: string;
  gender?: string;
  age_range?: string;
  job?: string;
}

export class Users extends Model<UsersAttributes> {
  pk_user_id: string;
  user_name: string;
  email: string;
  password: string;
  gender?: string;
  age_range?: string;
  job?: string;
}

const UserModel = sequelize.define(
  "user",
  {
    pk_user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 카카오 로그인은 비번 필요없으니 빼기도 하나 봄
    },
    gender: {
      type: DataTypes.ENUM("F", "M"),
      allowNull: true,
    },
    age_range: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    job: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    modelName: "Users",
    tableName: "tb_user",
    freezeTableName: true,
    timestamps: true,
    paranoid: true, // 삭제일 (복구용)
    underscored: true,
  },
);

Users.init(
  {
    pk_user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 카카오 로그인은 비번 필요없으니 빼기도 하나 봄
    },
    gender: {
      type: DataTypes.ENUM("F", "M"),
      allowNull: true,
    },
    age_range: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    job: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Users",
    tableName: "tb_user",
    freezeTableName: true,
    timestamps: true,
    paranoid: true, // 삭제일 (복구용)
    underscored: true,
  },
);

// Users.beforeCreate((UsersAttributes) => (UsersAttributes.pk_user_id = uuid()));
export default UserModel;
