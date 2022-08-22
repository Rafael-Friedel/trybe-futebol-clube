import { Jwt } from 'jsonwebtoken';
import IUser from './IUser.interface';

interface IJwt extends Jwt {
  data: IUser;
}

export default IJwt;
