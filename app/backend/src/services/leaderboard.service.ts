import db from '../database/models';
import ClassificationTable from '../interfaces/ClassificationTable.interface';

const queryBestInHomes = `SELECT
t.team_name as time,
  cast(SUM((((m.home_team_goals > m.away_team_goals) * 3) + 
  (m.home_team_goals = m.away_team_goals))) as unsigned integer) as totalPoints,
  cast(COUNT(m.home_team) as unsigned integer)  AS totalGames,
  cast(SUM(m.home_team_goals > m.away_team_goals) as unsigned integer) AS totalVictories,
  cast(SUM(m.home_team_goals = m.away_team_goals) as unsigned integer) AS totalDraws,
  cast(SUM(m.home_team_goals < m.away_team_goals) as unsigned integer)  AS totalLosses,
  cast(SUM(m.home_team_goals) as unsigned integer) AS goalsFavor,
  cast(SUM(m.away_team_goals) as unsigned integer) AS goalsOwn,
  (SUM(m.home_team_goals)) - (SUM(m.away_team_goals)) AS goalsBalance,
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
goalsOwn ASC;`;

const queryBestInAway = `SELECT
t.team_name as time,
  cast(SUM((((m.home_team_goals < m.away_team_goals) * 3) + 
  (m.home_team_goals = m.away_team_goals))) as unsigned integer) as totalPoints,
  cast(COUNT(m.home_team) as unsigned integer) AS totalGames,
  cast(SUM(m.home_team_goals < m.away_team_goals) as unsigned integer)  AS totalVictories,
  cast(SUM(m.home_team_goals = m.away_team_goals) as unsigned integer)  AS totalDraws,
  cast(SUM(m.home_team_goals > m.away_team_goals) as unsigned integer)  AS totalLosses,
  cast(SUM(m.home_team_goals) as unsigned integer)  AS goalsFavor,
  cast(SUM(m.away_team_goals) as unsigned integer) AS goalsOwn,
(SUM(m.away_team_goals)) - (SUM(m.home_team_goals)) AS goalsBalance,
FORMAT((((SUM(m.home_team_goals < m.away_team_goals) * 3) + 
SUM(m.home_team_goals = m.away_team_goals))/(COUNT(m.home_team)*3)*100), 2) as efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS t
LEFT JOIN TRYBE_FUTEBOL_CLUBE.matches AS m
ON m.away_team = t.id
WHERE m.in_progress = false
GROUP BY t.team_name
ORDER BY totalPoints DESC,
totalVictories DESC, 
goalsBalance DESC,
goalsFavor DESC,
goalsOwn ASC;`;

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
