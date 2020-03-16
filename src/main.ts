import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { version } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get('ConfigService');

  const port = configService.get('PORT');
  const useSwaggerDoc = configService.get('SWAGGER_DOC') === 'TRUE';

  if (useSwaggerDoc) {
    const options = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The Sven API description')
      .setVersion(version)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(port || 3000);
}

bootstrap();
