// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/dto/user.dto';
import { UserMapper } from '../users/mapper/user.mapper';

@Injectable()
export class AuthService {
  public constructor(private readonly prisma: PrismaService) {}

  public async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return UserMapper.toDto(user);
  }
}
