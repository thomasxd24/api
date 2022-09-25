import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';

import { DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import 'dotenv/config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Creating the NestJS app
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  //#region Global configuration
  const configService = app.get(ConfigService);
  const appPort = configService.get('http.port');
  //#endregion

  //#region Configuration of the swagger documentation
  const config = new DocumentBuilder().setTitle("API : Association des Étudiants de l'UTBM").setDescription('Rest API for the AE UTBM').setVersion('0.0.1').addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authenticatedUser').build();

  const options: SwaggerDocumentOptions = { deepScanRoutes: true };
  const swaggerOptions: SwaggerCustomOptions = {
    customSiteTitle: 'AE UTBM: API',
    customCssUrl: '/swagger/custom.css',
    customJs: '/swagger/custom.js',
    customfavIcon: '/swagger/favicon.ico',
  };
  //#endregion

  // Add static files to the app
  app.useStaticAssets(`${__dirname}/../public`);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableVersioning({ type: VersioningType.URI });

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document, swaggerOptions);

  await app.listen(appPort);

  Logger.log(`Server running on port ${appPort}`, 'Bootstrap');
  Logger.log(`Swagger documentation available on http://localhost:${appPort}/docs`, 'Bootstrap');
  Logger.log(`Swagger JSON docs at http://localhost:${appPort}/docs-json`, 'Bootstrap');
}

bootstrap();
