import Match from '../database/models/Match.model';

interface IMatch extends Match {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default IMatch;
