import { sign, verify } from 'jsonwebtoken';
import ErrorWithStatus from '../database/midleware/ErrorWithStatus';
import IJwt from '../interfaces/IJwt.interface';
import IUser from '../interfaces/IUser.interface';

const msgTokenInvalid = 'Token must be a valid token';

const secret = process.env.JWT_SECRET || 'secret';

class AuthService {
  static async createToken(data: IUser): Promise<string> {
    const { id, username } = data;
    const newData = { id, username };
    const token = sign({ newData }, secret);
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
    try {
      const token = auth.includes('Bearer') ? auth.split(' ')[1] : auth;
      const user = await this.readToken(token);
      return user.id;
    } catch (err) {
      throw new ErrorWithStatus(msgTokenInvalid, 401);
    }
  }
}

export default AuthService;
