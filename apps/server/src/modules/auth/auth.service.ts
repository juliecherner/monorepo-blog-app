import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

import { JwtPayload } from './jwt-payload.type';


const saltOrRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, password, role }: AuthRegisterDto) {
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = await this.userService.create({
      username,
      password: hashedPassword,
      role
    });
    return user;
  }

  async login({ username, password }: AuthLoginDto) {
    const users = await this.userService.find({ username });

    if (!users) {
      throw new UnauthorizedException('Invalid username');
    }
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = { _id: user._id, username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async me(user: JwtPayload) {
    const dbUser = await this.userService.findOne(user._id);
    if (!dbUser) return null;
    return {
      _id: dbUser._id,
      username: dbUser.username
    }; 
  }
}
