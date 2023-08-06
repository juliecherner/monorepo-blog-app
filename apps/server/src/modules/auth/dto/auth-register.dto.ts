import { ApiProperty } from "@nestjs/swagger";
import { AuthLoginDto } from "./auth-login.dto";

enum Role {
  admin = "ADMIN",
  user = "USER"
}

export class AuthRegisterDto extends AuthLoginDto {
  @ApiProperty({
    example: 'admin',
    description: 'admin or user',
  })
  role: Role;
}