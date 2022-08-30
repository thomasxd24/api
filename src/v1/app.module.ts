import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './authentication/auth.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password:
        process.env.PRODUCTION === 'false' ? null : process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: process.env.PRODUCTION === 'false', // should be set to false in production mode
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class ModuleV1 {}
