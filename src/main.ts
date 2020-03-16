import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get('ConfigService');

  const port = configService.get('PORT');
  const useSwaggerDoc = configService.get('SWAGGER_DOC:') === 'TRUE';

  await app.listen(port || 3000);
}

bootstrap();
