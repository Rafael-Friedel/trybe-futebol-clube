import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
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

  static async create(req: Request, res: Response) {
    const token = req.headers.authorization;
    await AuthService.validateToken(token);
    const match = await MatchService.create(req.body);
    res.status(201).json(match);
  }
}

export default MatchController;
