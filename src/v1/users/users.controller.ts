import { Controller, Get, UseGuards, Param, Inject } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserService } from './users.service';

@Controller({ version: ['1'], path: 'users' })
@ApiTags('users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get('id')
  @ApiSecurity('authenticatedUser')
  @UseGuards(JwtAuthGuard)
  private root(@Param('id') id: string): Promise<any> {
    return this.userService.getUser(id);
  }
}
