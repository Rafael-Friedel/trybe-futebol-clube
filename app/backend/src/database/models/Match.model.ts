import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team.model';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: number;
}

Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team',
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
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
