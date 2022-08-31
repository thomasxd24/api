import { Module } from '@nestjs/common';

import { ModuleV1 } from './v1/app.module';

@Module({
  imports: [ModuleV1],
  controllers: [],
  providers: [],
})
export class AppModule {}
