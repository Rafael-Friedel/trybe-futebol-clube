import { Request, Response } from 'express';
import CT from '../interfaces/ClassificationTable.interface';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  static async bestshome(req: Request, res: Response) {
    const all = await LeaderboardService.bestshome();
    res.status(200).json(all);
  }

  static async bestsAway(req: Request, res: Response) {
    const all = await LeaderboardService.bestsAway();
    res.status(200).json(all);
  }

  private static tableAll = (home: CT[], team: CT) => {
    const homeTeam = home.find((team2) => team.name === team2.name);
    const table = {
      name: homeTeam?.name,
      totalPoints: team.totalPoints + (homeTeam?.totalPoints || 0),
      totalGames: team.totalGames + (homeTeam?.totalGames || 0),
      totalVictories: team.totalVictories + (homeTeam?.totalVictories || 0),
      totalDraws: team.totalDraws + (homeTeam?.totalDraws || 0),
      totalLosses: team.totalLosses + (homeTeam?.totalLosses || 0),
      goalsFavor: team.goalsFavor + (homeTeam?.goalsFavor || 0),
      goalsOwn: team.goalsOwn + (homeTeam?.goalsOwn || 0),
      goalsBalance: +team.goalsBalance + +(homeTeam?.goalsBalance || 0),
    };
    return {
      ...table,
      efficiency: ((table.totalPoints / (table.totalGames * 3)) * 100).toFixed(
        2,
      ),
    };
  };

  static async bestTeams(req: Request, res: Response) {
    const away = await LeaderboardService.bestsAway();
    const home = await LeaderboardService.bestshome();
    const allTeams = away
      .map((team) => LeaderboardController.tableAll(home, team))
      .sort(
        (b, a) =>
          a.totalPoints - b.totalPoints
          || a.totalVictories - b.totalVictories
          || a.goalsBalance - b.goalsBalance
          || a.goalsFavor - b.goalsFavor
          || b.goalsOwn - a.goalsOwn,
      );
    res.status(200).json(allTeams);
  }
}

export default LeaderboardController;
