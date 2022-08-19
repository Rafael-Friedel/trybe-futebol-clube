import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const isProgress = inProgress === 'true';
      const allMatches = await MatchService.findAllByProgress(isProgress);
      return res.status(200).json(allMatches);
    }
    const allMatches = await MatchService.getAll();
    res.status(200).json(allMatches);
  }
}

export default MatchController;
