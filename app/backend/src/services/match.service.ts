import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';

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
}

export default MatchService;
