import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { version } from '../package.json';
import { BunyanLoggerService } from './logger/logger.service';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { UncaughtExceptionsFilter } from './exceptions/uncaught-exception-filter';
import { HttpExceptionFilter } from './exceptions/http';

async function bootstrap() {
  const logger = new BunyanLoggerService();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger },
  );

  app.use(compression());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new UncaughtExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get('ConfigService');

  const port = configService.get('PORT');
  const useSwaggerDoc = configService.get('SWAGGER_DOC') === 'TRUE';

  if (useSwaggerDoc) {
    const options = new DocumentBuilder()
      .setTitle('Sven example')
      .setDescription('The Sven API description')
      .setVersion(version)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(port || 3000);
}

bootstrap();
