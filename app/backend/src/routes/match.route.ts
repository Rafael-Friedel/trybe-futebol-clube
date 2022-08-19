import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

router.route('/').get(MatchController.getAll);
router.route('/').post(MatchController.create);

export default router;
