import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { IUser, IUserCreate } from './domain/user.model';
import { IUsersRepositoryAdapter } from './adapter/users.adapter';

@Injectable()
export class UsersRepository implements IUsersRepositoryAdapter {
  public constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<IUser[]> {
    return this.prisma.user.findMany();
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async create(user: IUserCreate): Promise<IUser> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
