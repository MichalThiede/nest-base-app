import { Role } from './role.model';

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
}
