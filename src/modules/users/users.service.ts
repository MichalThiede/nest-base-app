import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { UserMapper } from './mapper/user.mapper';
import { UserDto } from './dto/user.dto';
import { IUsersServiceAdapter } from './adapter/users.adapter';

@Injectable()
export class UsersService implements IUsersServiceAdapter {
  public constructor(private readonly usersRepo: UsersRepository) {}

  public async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepo.findAll();
    return UserMapper.toDtos(users);
  }

  public async findById(id: string): Promise<UserDto | null> {
    const user = await this.usersRepo.findById(id);
    if (!user) {
      return null;
    }
    return UserMapper.toDto(user);
  }

  public async create(dto: UserCreateDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    dto.password = hashedPassword;

    const userEntity = UserMapper.createDtoToDomain(dto);

    const user = await this.usersRepo.create(userEntity);

    return UserMapper.toDto(user);
  }
}
