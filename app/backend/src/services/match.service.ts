import ErrorWithStatus from '../database/midleware/ErrorWithStatus';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import IMatch from '../interfaces/IMatch.interface';
import IMatchUpdate from '../interfaces/IMatchUpdate.interface';

class MatchService {
  static async getAll() {
    const allMatches = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
      raw: true,
      nest: true,
    });
    return allMatches;
  }

  static async findAllByProgress(inProgress: boolean) {
    const allMatches = await Match.findAll({
      where: { inProgress },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
      raw: true,
      nest: true,
    });
    return allMatches;
  }

  static async create(match: IMatch) {
    // match.inProgress = true; por que não funciona?
    const add = { ...match, inProgress: true };
    const newMatch = await Match.create(add);
    return newMatch;
  }

  static async finishMatch(id: number) {
    await Match.update(
      {
        inProgress: false,
      },
      { where: { id, inProgress: true } },
    );
  }

  static async validTeams(teams: IMatch) {
    const { awayTeam, homeTeam } = teams;
    if (awayTeam === homeTeam) {
      throw new ErrorWithStatus(
        'It is not possible to create a match with two equal teams',
        401,
      );
    }
    const team1 = await Team.findByPk(awayTeam);
    const team2 = await Team.findByPk(homeTeam);
    if (!team1 || !team2) {
      throw new ErrorWithStatus('There is no team with such id!', 404);
    }
  }

  static async update(body: IMatchUpdate) {
    const { id, awayTeamGoals, homeTeamGoals } = body;
    await Match.update(
      {
        awayTeamGoals,
        homeTeamGoals,
      },
      { where: { id } },
    );
  }
}

export default MatchService;
