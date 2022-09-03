import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './users/users.module';
import { V1Controller } from './v1.controller';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [V1Controller],
  providers: [],
})
export class ModuleV1 {}
