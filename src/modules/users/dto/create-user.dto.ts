import { IsEmail, IsEnum, IsString } from 'class-validator';
import * as roleModel from '../../auth/domain/role.model';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public name: string;

  @IsEnum(Role)
  public role: roleModel.Role;
}
