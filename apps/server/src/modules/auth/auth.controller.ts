import {
  Controller,
  Get,
  Request,
  Body,
  Post,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtPayload } from 'types';
import { Requestor } from './requestor.decorator';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth routes')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @ApiBearerAuth('default')
  @UseGuards(AuthGuard)
  async me(@Headers() headers: string, @Requestor() requestor: JwtPayload) {
    return await this.authService.me(requestor);
    //return requestor;
  }

  @Post('register')
  async register(@Body() authDto: AuthRegisterDto) {
    return await this.authService.register(authDto);
  }

  @Post('login')
  async login(@Body() authDto: AuthLoginDto) {
    return await this.authService.login(authDto);
  }
}
