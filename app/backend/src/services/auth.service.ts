import { sign, verify } from 'jsonwebtoken';
import ErrorWithStatus from '../database/midleware/ErrorWithStatus';
import User from '../database/models/User.model';
import IJwt from '../interfaces/IJwt.interface';
import IUser from '../interfaces/IUser.interface';

const msgTokenInvalid = 'Token must be a valid token';

const secret = process.env.JWT_SECRET || 'secret';

class AuthService {
  static async createToken(newData: IUser): Promise<string> {
    const { id, username } = newData;
    const data = { id, username };
    const token = sign({ data }, secret);
    return token;
  }

  static async readToken(token: string) {
    const { data } = verify(token, secret) as IJwt;
    return data;
  }

  static async validateToken(auth: string | undefined) {
    if (!auth) {
      throw new ErrorWithStatus(msgTokenInvalid, 401);
    }
    const token = auth.includes('Bearer') ? auth.split(' ')[1] : auth;
    const { id } = await this.readToken(token);
    const user = await User.findOne({ where: { id }, raw: true });
    if (!user) {
      throw new ErrorWithStatus(msgTokenInvalid, 401);
    }
    return user.role;
  }
}

export default AuthService;
