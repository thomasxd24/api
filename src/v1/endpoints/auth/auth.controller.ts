import { Request } from 'express';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthValidated } from './auth.helper';
import { SafeUser } from '../users/users.dto';

import {
  Body,
  Headers,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors
} from '@nestjs/common';

export interface UserRequest extends Request {
  user: SafeUser;
}

@Controller({ version: ['1'], path: 'auth' })
@ApiTags('Authentication')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto, @Headers() head): Promise<SafeUser | never> {
    return this.service.register(body, head.origin);
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<AuthValidated | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  private refresh(@Req() { user }: UserRequest): Promise<AuthValidated | never> {
    return this.service.refresh(<User>user);
  }

  @Get('verify/:uuid/:token/:redirect')
  private verify(@Param('uuid') uuid: string, @Param('token') token: string, @Param('redirect') redirect: string, @Res() res): Promise<any> {
    return this.service.verify(uuid, token).then(() => res.redirect(decodeURI(redirect)));
  }
}
