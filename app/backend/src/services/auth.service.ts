import { Jwt, sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

class authService {
  static async createToken(id: number): Promise<string> {
    const token = sign({ data: id }, secret);
    return token;
  }

  static async readToken(token: string) {
    const { payload: data } = verify(token, secret) as Jwt;
    return data;
  }
}

export default authService;
