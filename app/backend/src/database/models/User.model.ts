import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
    },
    role: {
      type: STRING,
    },
    email: {
      type: STRING,
      unique: true,
    },
    password: {
      type: STRING,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'users',
    underscored: true,
  },
);

export default User;
