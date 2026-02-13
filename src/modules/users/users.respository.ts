import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './domain/user.model';

@Injectable()
export class UsersRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<IUser[]> {
    return this.prisma.user.findMany();
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async create(user: CreateUserDto): Promise<IUser> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
