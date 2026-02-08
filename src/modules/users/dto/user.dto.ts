import { Role } from '../domain/role.model';

export class UserDto {
  public id: string;
  public email: string;
  public name: string;
  public role: Role;
}
