import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from './domain/user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  public constructor(private readonly usersRepo: UsersRepository) {}

  public async findAll(): Promise<IUser[]> {
    return this.usersRepo.findAll();
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.usersRepo.findById(id);
  }

  public async create(dto: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersRepo.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
      role: dto.role,
    });

    return user;
  }
}
