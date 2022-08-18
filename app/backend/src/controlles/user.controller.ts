import { Request, Response } from 'express';
import User from '../database/models/User.model';
import authService from '../services/auth.service';
import UserService from '../services/user.service';

class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    await UserService.validate(email, password);
    const { id, username } = (await UserService.login(email, password)) as User;
    const token = await authService.createToken({ id, username });
    res.status(200).json({ token });
  }
}

export default UserController;
