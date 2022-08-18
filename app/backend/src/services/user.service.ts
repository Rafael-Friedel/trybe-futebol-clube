import ErrorWithStatus from '../database/midleware/ErrorWithCode';
import User from '../database/models/User.model';

class UserService {
  static async validate(email: string, password: string): Promise<void> {
    if (!password || !email) {
      throw new ErrorWithStatus('All fields must be filled', 400);
    }
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!regex.test(email) || password.length < 7) {
      throw new ErrorWithStatus('Incorrect email or password', 401);
    }
  }

  static async login(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}

export default UserService;
