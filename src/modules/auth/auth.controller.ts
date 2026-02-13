// auth/auth.controller.ts
// eslint-disable-next-line no-redeclare
import { Controller, Post, Body, UseGuards, Res, Req } from '@nestjs/common';
// eslint-disable-next-line no-redeclare
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { OriginGuard } from 'src/common/guards/origin.guard';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const tokens = await this.authService.login(dto);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // important for CSRF protection
      path: '/auth/refresh',
      maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN),
    });

    return { accessToken: tokens.accessToken };
  }

  @UseGuards(OriginGuard)
  @Post('refresh')
  public async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const tokens = await this.authService.refreshTokens(req.cookies.refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // important for CSRF protection
      path: '/auth/refresh',
      maxAge: Number(process.env.JWT_REFRESH_EXPIRES_IN),
    });

    return { accessToken: tokens.accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  public async logout(
    @GetUser('sub') userId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ success: boolean }> {
    await this.authService.logout(userId);

    res.clearCookie('refreshToken', {
      path: '/auth/refresh',
    });

    return { success: true };
  }
}
