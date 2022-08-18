import { Request, Response } from 'express';
import User from '../database/models/User.model';
import authService from '../services/auth.service';
import UserService from '../services/user.service';

class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    await UserService.validateEmailAndPassword(email, password);
    const { id, username } = (await UserService.login(email, password)) as User;
    const token = await authService.createToken({ id, username });
    res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const auth = req.headers.authorization;
    const user = await UserService.validate(auth);
    const { email, role } = user;
    await UserService.exists(email);
    res.status(200).json({ role });
  }
}

export default UserController;
