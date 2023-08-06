import { ApiProperty } from '@nestjs/swagger';
import {Role} from "./user-role.enum";

export class CreateUserDto {
  @ApiProperty({
    example: 'username',
    description: 'Username',
  })
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'Password',
  })
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'admin or user',
  })
  role: Role;
}
