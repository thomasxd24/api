import { HttpException, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './v1/prisma/prisma.module';
import { ModuleV1 } from './v1/v1.module';

@Module({
  imports: [
    ModuleV1,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        dsn: config.getOrThrow<string>('SENTRY_DSN'),
        debug: false,
        environment: config.getOrThrow<string>('NODE_ENV'),
        logLevels: ['error']
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useFactory: () => new SentryInterceptor({
      filters: [{
        type: HttpException,
        filter: (exception: HttpException) => 500 > exception.getStatus()
      }]
    })
  }],
})
export class AppModule {}
