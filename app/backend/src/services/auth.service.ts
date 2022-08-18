import { Jwt, sign, verify } from 'jsonwebtoken';
import IData from '../interfaces/IData.interface';

const secret = process.env.JWT_SECRET || 'secret';

class authService {
  static async createToken(data: IData): Promise<string> {
    const token = sign({ data }, secret);
    return token;
  }

  static async readToken(token: string) {
    const { payload: data } = verify(token, secret) as Jwt;
    return data;
  }
}

export default authService;
