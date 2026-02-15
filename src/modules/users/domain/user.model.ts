import { Role } from '../../auth/domain/role.model';

export interface IUser {
  id: string;
  email: string;
  password: string;
  refreshTokenHash: string | null;
  name: string;
  role: Role;
}

export interface IUserCreate {
  email: string;
  password: string;
  name: string;
  role: Role;
}
