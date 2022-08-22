import * as bcrypt from 'bcryptjs';
import ErrorWithStatus from '../database/midleware/ErrorWithStatus';
import User from '../database/models/User.model';

const msgIncorrectEmailOrPassword = 'Incorrect email or password';

class UserService {
  static async login(email: string, password: string) {
    if (!password || !email) {
      throw new ErrorWithStatus('All fields must be filled', 400);
    }
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      throw new ErrorWithStatus(msgIncorrectEmailOrPassword, 401);
    }
    const { password: isValid } = user as User;
    const pass = await bcrypt.compare(password, isValid);
    if (!pass) {
      throw new ErrorWithStatus(msgIncorrectEmailOrPassword, 401);
    }
    return user;
  }
}

export default UserService;
