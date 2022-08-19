import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.route('/').post(UserController.login);
router.route('/validate').get(UserController.validate);

export default router;
