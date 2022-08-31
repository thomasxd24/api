import { Module } from '@nestjs/common';
import { PrismaModule } from './v1/prisma/prisma.module';
import { ModuleV1 } from './v1/v1.module';

@Module({
  imports: [ModuleV1, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
