import { Request, Response } from 'express';
import ClassificationTable from '../interfaces/ClassificationTable.interface';
import leaderboardService from '../services/leaderboard.service';

const tableAll = (home: ClassificationTable[], team: ClassificationTable) => {
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
    efficiency: ((table.totalPoints / (table.totalGames * 3)) * 100).toFixed(2),
  };
};

class leaderboardController {
  static async bestshome(req: Request, res: Response) {
    const all = await leaderboardService.bestshome();
    res.status(200).json(all);
  }

  static async bestsAway(req: Request, res: Response) {
    const all = await leaderboardService.bestsAway();
    res.status(200).json(all);
  }

  static async bestTeams(req: Request, res: Response) {
    const away = await leaderboardService.bestsAway();
    const home = await leaderboardService.bestshome();
    const test = away
      .map((team) => tableAll(home, team))
      .sort(
        (b, a) =>
          a.totalPoints - b.totalPoints
          || a.totalVictories - b.totalVictories
          || a.goalsBalance - b.goalsBalance
          || a.goalsFavor - b.goalsFavor
          || b.goalsOwn - a.goalsOwn,
      );
    res.status(200).json(test);
  }
}

export default leaderboardController;
