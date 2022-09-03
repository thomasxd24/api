import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';

import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import 'dotenv/config';

async function bootstrap() {
  // Configuration of the swagger documentation
  const config = new DocumentBuilder()
    .setTitle("API : Association des Étudiants de l'UTBM")
    .setDescription('Rest API for the AE UTBM')
    .setVersion('0.0.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'authenticatedUser',
    )
    .build();

  const options: SwaggerDocumentOptions = { deepScanRoutes: true };
  const swaggerOptions: SwaggerCustomOptions = {
    customSiteTitle: 'AE UTBM: API',
    customCssUrl: '/swagger/custom.css',
    customJs: '/swagger/custom.js',
    customfavIcon: '/swagger/favicon.ico',
  };

  // Creating the NestJS app
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  // Add static files to the app
  app.useStaticAssets(`${__dirname}/../public`);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI })

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api/docs', app, document, swaggerOptions);

  await app.listen(process.env.PORT);

  Logger.log(`Server running on port ${process.env.PORT}`, 'Bootstrap');
  Logger.log(`Swagger documentation available on http://localhost:${process.env.PORT}/api/docs`, 'Bootstrap');
  Logger.log(`Swagger JSON docs at http://localhost:${process.env.PORT}/api/docs-json`, 'Bootstrap');
}

bootstrap();
