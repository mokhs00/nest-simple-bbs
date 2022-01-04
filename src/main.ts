import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import { AppModule } from './app.module';
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');

  const port = serverConfig.port || 3000;
  await app.listen(port);
  logger.log(`Application running on port : ${port}`);
}
bootstrap();
