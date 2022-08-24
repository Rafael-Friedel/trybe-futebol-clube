import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.route('/home').get(LeaderboardController.bestshome);
router.route('/away').get(LeaderboardController.bestsAway);
router.route('/').get(LeaderboardController.bestTeams);

export default router;
