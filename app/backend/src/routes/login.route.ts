import { Router } from 'express';
import UserController from '../controlles/user.controller';

const router = Router();

router.route('/').post(UserController.login);

export default router;
