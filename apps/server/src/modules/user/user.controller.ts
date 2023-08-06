import { Body, Param, Controller, Get, Post, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseController } from '../base/base.controller';
import { BaseService } from '../base/base.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly userService: BaseService<
      UserModel,
      CreateUserDto,
      UpdateUserDto
    >,
  ) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Patch()
  async update(@Body() createUserDto: UpdateUserDto, @Param('id') id: string) {
    const user = await this.userService.update(id, createUserDto);
    return user;
  }
}