import { IUser, IUserCreate } from '../domain/user.model';
import { UserCreateDto } from '../dto/user.create.dto';
import { UserDto } from '../dto/user.dto';

export interface IUsersServiceAdapter {
  findAll(): Promise<UserDto[]>;
  findById(id: string): Promise<UserDto | null>;
  create(dto: UserCreateDto): Promise<UserDto>;
}

export interface IUsersRepositoryAdapter {
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  create(user: IUserCreate): Promise<IUser>;
}
