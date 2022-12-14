import { Request, Response } from 'express';
import User from '../database/models/User.model';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const data = (await UserService.login(email, password)) as User;
    const token = await AuthService.createToken(data);
    res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const auth = req.headers.authorization;
    const role = await AuthService.validateToken(auth);
    res.status(200).json({ role });
  }
}

export default UserController;
