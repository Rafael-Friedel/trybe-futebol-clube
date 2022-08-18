import { sign, verify } from 'jsonwebtoken';
import IData from '../interfaces/IData.interface';
import IJwt from '../interfaces/IJwt.interface';

const secret = process.env.JWT_SECRET || 'secret';

class authService {
  static async createToken(data: IData): Promise<string> {
    const token = sign({ data }, secret);
    return token;
  }

  static async readToken(token: string) {
    const { data } = verify(token, secret) as IJwt;
    return data;
  }
}

export default authService;
