// eslint-disable-next-line no-redeclare
import { Controller, Get, Param, Post, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMapper } from './mapper/user.mapper';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    if (!users || users.length === 0) {
      throw new NotFoundException(`Users not found`);
    }
    return UserMapper.toDtos(users);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return UserMapper.toDto(user);
  }

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<UserDto> {
    return UserMapper.toDto(await this.usersService.create(dto));
  }
}
