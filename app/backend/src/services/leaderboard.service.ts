import Team from '../database/models/Team.model';

class leaderboardService {
  static async bestshome() {
    const allTime = await Team.findAll();
    return allTime;
  }
}

export default leaderboardService;
