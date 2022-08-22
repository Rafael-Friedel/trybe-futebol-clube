import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

router.route('/').get(MatchController.getAll);
router.route('/').post(MatchController.create); // 27 = verificar token
router.route('/:id/finish').patch(MatchController.finishMatch);
router.route('/:id').patch(MatchController.update); // 28- atualizar partida em andamento
export default router;
