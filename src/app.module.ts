import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './v1/prisma/prisma.module';
import { ModuleV1 } from './v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Make the config module alvailable everywhere
      isGlobal: true,
    }),
    ModuleV1,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
