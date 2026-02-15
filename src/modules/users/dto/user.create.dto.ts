import { IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';
import * as roleModel from '../../auth/domain/role.model';
import { Role } from '@prisma/client';

export class UserCreateDto {
  @IsDefined()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;

  @IsDefined()
  @IsString()
  public name: string;

  @IsDefined()
  @IsEnum(Role)
  public role: roleModel.Role;
}
