import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamname!: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamname: {
      type: STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'teams',
  },
);

export default Team;
