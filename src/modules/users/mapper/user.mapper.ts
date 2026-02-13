import { IUser } from '../domain/user.model';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
  public static toDto(user: IUser): UserDto {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, refreshTokenHash, ...rest } = user;
    return rest;
  }

  public static toDtos(users: IUser[]): UserDto[] {
    return users.map(this.toDto);
  }
}
