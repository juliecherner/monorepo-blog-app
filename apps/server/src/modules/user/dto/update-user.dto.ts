import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Role } from '../user-role.type';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'Enter new name for user' })
  name: string;

  @ApiProperty({ example: 'Enter new description for user' })
  description: string;

  @ApiProperty({ example: 'Enter new role for user' })
  role: Role;
}
