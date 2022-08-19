import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

router.route('/:id').get(TeamController.getById);

router.route('/').get(TeamController.getAll);

export default router;
