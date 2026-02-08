// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/dto/user.dto';
import { UserMapper } from '../users/mapper/user.mapper';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(email: string, password: string): Promise<UserDto> {
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

  public async login(dto: LoginDto): Promise<{ user: UserDto; token: string }> {
    const user = await this.validateUser(dto.email, dto.password);

    const payload = { sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
