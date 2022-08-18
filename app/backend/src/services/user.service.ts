import * as bcrypt from 'bcryptjs';
import ErrorWithStatus from '../database/midleware/ErrorWithStatus';
import User from '../database/models/User.model';
import authService from './auth.service';

class UserService {
  static async validateEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    if (!password || !email) {
      throw new ErrorWithStatus('All fields must be filled', 400);
    }
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regex.test(email) || password.length < 7) {
      throw new ErrorWithStatus('Incorrect email or password', 401);
    }
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email }, raw: true });
    const { password: valid } = user as User;
    const pass = await bcrypt.compare(password, valid);
    if (!pass) {
      throw new ErrorWithStatus('Incorrect email or password', 401);
    }
    return user;
  }

  static async validate(auth: string | undefined) {
    if (!auth) {
      throw new ErrorWithStatus('Token must be a valid token', 401);
    }
    const token = auth.includes('Bearer') ? auth.split(' ')[1] : auth;
    const user = await authService.readToken(token);
    return user.id;
  }

  static async exists(id: number) {
    const user = await User.findOne({ where: { id }, raw: true });
    if (!user) {
      throw new ErrorWithStatus('Token must be a valid token', 401);
    }
    return user.role;
  }
}

export default UserService;
