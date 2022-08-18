import { Jwt } from 'jsonwebtoken';
import IData from './IData.interface';

interface IJwt extends Jwt {
  data: IData;
}

export default IJwt;
