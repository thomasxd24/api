import { Request } from 'express';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthValidated } from './auth.helper';

import { Body, ClassSerializerInterceptor, Controller, Inject, Post, Req, UseInterceptors } from '@nestjs/common';
import { SafeUser } from 'src/users/users.dto';

export interface UserRequest extends Request {
  user: SafeUser;
}

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<SafeUser | never> {
    return this.service.register(body);
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<AuthValidated | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  private refresh(@Req() { user }: UserRequest): Promise<AuthValidated | never> {
    return this.service.refresh(<User>user);
  }
}
