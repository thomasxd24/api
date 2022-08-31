import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
