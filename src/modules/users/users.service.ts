import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from './domain/user.model';

@Injectable()
export class UsersService {
  public constructor(private readonly prisma: PrismaService) {}

  public async findAll(): Promise<IUser[]> {
    return this.prisma.user.findMany();
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async create(dto: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: dto.role,
      },
    });
  }
}
