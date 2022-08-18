import { Request, Response } from 'express';
// import authService from '../services/auth.service';
import UserService from '../services/user.service';

class UserController {
  static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    await UserService.validate(email, password);
    const id = await UserService.login(email);
    // const token = await authService.createToken(id);
    res.status(200).json({ id });
  }
}

export default UserController;
