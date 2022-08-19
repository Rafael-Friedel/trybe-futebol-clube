import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import IMatch from '../interfaces/IMatch.interface';

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
      { where: { id } },
    );
  }
}

export default MatchService;
