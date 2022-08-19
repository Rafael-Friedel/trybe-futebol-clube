import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

router.route('/').get(MatchController.getAll);

export default router;