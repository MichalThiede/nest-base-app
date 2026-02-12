import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;
}
