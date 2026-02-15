import { IUser, IUserCreate } from '../domain/user.model';
import { UserDto } from '../dto/user.dto';
import { UserCreateDto } from '../dto/user.create.dto';

export class UserMapper {
  public static toDto(user: IUser): UserDto {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, refreshTokenHash, ...rest } = user;
    return rest;
  }

  public static toDtos(users: IUser[]): UserDto[] {
    return users.map(this.toDto);
  }

  public static createDtoToDomain(dto: UserCreateDto): IUserCreate {
    const user = {
      email: dto.email,
      name: dto.name,
      password: dto.password,
      role: dto.role,
    };
    return user;
  }
}
