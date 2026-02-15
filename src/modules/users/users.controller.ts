// eslint-disable-next-line no-redeclare
import { Controller, Get, Param, Post, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN', 'SUPPORT')
  public async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    if (!users || users.length === 0) {
      throw new NotFoundException(`Users not found`);
    }
    return users;
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPPORT')
  public async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  @Roles('ADMIN')
  public async create(@Body() dto: UserCreateDto): Promise<UserDto> {
    return await this.usersService.create(dto);
  }
}
