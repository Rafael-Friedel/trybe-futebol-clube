import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.route('/home').get(leaderboardController.bestshome);
router.route('/away').get(leaderboardController.bestsAway);

export default router;
