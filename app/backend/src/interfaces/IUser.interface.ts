import User from '../database/models/User.model';

interface IUser extends User {
  id: number;
  userName: string;
}

export default IUser;
