import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

router.route('/').get(MatchController.getAll);
router.route('/').post(MatchController.create);
router.route('/:id/finish').patch(MatchController.finishMatch);
router.route('/:id').patch(MatchController.update);

export default router;
