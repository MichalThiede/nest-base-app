import { LoginDto } from '../dto/login.dto';

export interface IAuthServiceAdapter {
  login(dto: LoginDto): Promise<{ accessToken: string; refreshToken: string }>;
  logout(userId: string): Promise<void>;
  refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
}
