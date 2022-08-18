import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team.model';

class Match extends Model {
  id!: number;
  hometeam!: number;
  hometeamgoals!: number;
  awayteam!: number;
  awayteamgoals!: number;
  inprogress!: number;
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
      type: INTEGER,
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

Match.hasMany(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.hasMany(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.belongsTo(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.belongsTo(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
