import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { logger } from './config/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('FRONTEND_URL');
  const port = configService.get<number>('PORT');

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  app.use(helmet());

  await app.listen(port ?? 3000);
}

bootstrap();
