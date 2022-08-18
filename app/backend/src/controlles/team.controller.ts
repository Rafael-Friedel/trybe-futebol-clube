import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamController {
  static async getAll(req: Request, res: Response) {
    const AllTeams = await TeamsService.getAll();
    res.status(200).json(AllTeams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.getById(Number(id));
    res.status(200).json(team);
  }
}

export default TeamController;
