import db from '../database/models';
import ClassificationTable from '../interfaces/ClassificationTable.interface';
import queryBestInAway from '../queries/bestInAway';
import queryBestInHomes from '../queries/bestInHome';

class LeaderboardService {
  static async bestshome() {
    const [allTime] = await db.query(queryBestInHomes);
    return allTime as ClassificationTable[];
  }

  static async bestsAway() {
    const [allTime] = await db.query(queryBestInAway);
    return allTime as ClassificationTable[];
  }
}

export default LeaderboardService;
