import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Match from './Match.model';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
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

Match.hasMany(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.hasMany(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.belongsTo(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.belongsTo(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Team;
