import db from '../database/models';
import ClassificationTable from '../interfaces/ClassificationTable.interface';

const queryBestInHomes = `SELECT
t.team_name as time,
  SUM((((m.home_team_goals > m.away_team_goals) * 3) + 
  (m.home_team_goals = m.away_team_goals))) as totalPoints,
  COUNT(m.home_team) AS totalGames,
  SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
  SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
  SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn,
SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance,
FORMAT((((SUM(m.home_team_goals > m.away_team_goals) * 3) + 
SUM(m.home_team_goals = m.away_team_goals))/(COUNT(m.home_team)*3)*100), 2) as efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS t
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS m
ON m.home_team = t.id
WHERE m.in_progress = false
GROUP BY t.team_name
ORDER BY totalPoints DESC,
totalVictories DESC, 
goalsBalance DESC,
goalsFavor DESC,
goalsOwn DESC;`;

const queryBestInAway = `SELECT
t.team_name as time,
  SUM((((m.home_team_goals < m.away_team_goals) * 3) + 
  (m.home_team_goals = m.away_team_goals))) as totalPoints,
  COUNT(m.home_team) AS totalGames,
  SUM(m.home_team_goals < m.away_team_goals) AS totalVictories,
  SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
  SUM(m.home_team_goals > m.away_team_goals) AS totalLosses,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn,
SUM(m.away_team_goals - m.home_team_goals ) AS goalsBalance,
FORMAT((((SUM(m.home_team_goals < m.away_team_goals) * 3) + 
SUM(m.home_team_goals = m.away_team_goals))/(COUNT(m.home_team)*3)*100), 2) as efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS t
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS m
ON m.away_team = t.id
WHERE m.in_progress = false
GROUP BY t.team_name
ORDER BY totalPoints DESC,
totalVictories DESC, 
goalsBalance DESC,
goalsFavor DESC,
goalsOwn DESC;`;

class leaderboardService {
  static async bestshome() {
    const [allTime] = await db.query(queryBestInHomes);
    return allTime as ClassificationTable[];
  }

  static async bestsAway() {
    const [allTime] = await db.query(queryBestInAway);
    return allTime as ClassificationTable[];
  }
}

export default leaderboardService;
