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
    await MatchService.validTeams(req.body);
    const match = await MatchService.create(req.body);
    res.status(201).json(match);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchService.finishMatch(+id);
    res.status(200).json({ message: 'Finished' });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const body = { id: +id, ...req.body };
    await MatchService.update(body);
    res.status(200).send('Partida atualizada com sucesso');
  }
}

export default MatchController;
