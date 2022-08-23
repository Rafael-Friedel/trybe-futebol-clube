import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

class leaderboardController {
  static async bestshome(req: Request, res: Response) {
    const all = await leaderboardService.bestshome();
    res.status(200).json(all);
  }

  static async bestsAway(req: Request, res: Response) {
    const all = await leaderboardService.bestsAway();
    res.status(200).json(all);
  }
}

export default leaderboardController;
