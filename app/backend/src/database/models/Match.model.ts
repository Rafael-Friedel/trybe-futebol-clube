import { BOOLEAN, INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Match extends Model {
  id!: number;
  teamName!: string;
}

Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hometeam: {
      type: STRING,
      allowNull: false,
      field: 'home_team',
    },
    hometeamgoals: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayteam: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team',
    },
    awayteamgoals: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inprogress: {
      type: BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  },
  {
    timestamps: false,
    sequelize: db,
    modelName: 'matches',
  },
);

export default Match;
