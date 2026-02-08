// auth/auth.controller.ts
// eslint-disable-next-line no-redeclare
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() dto: LoginDto): Promise<UserDto> {
    return this.authService.validateUser(dto.email, dto.password);
  }
}
