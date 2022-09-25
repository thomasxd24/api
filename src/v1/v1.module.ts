import { Module } from '@nestjs/common';
import { AuthModule } from './endpoints/auth/auth.module';
import { UserModule } from './endpoints/users/users.module';
import { V1Controller } from './v1.controller';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [V1Controller],
  providers: [],
})
export class ModuleV1 {}
