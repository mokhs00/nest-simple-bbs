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

  // config 모듈의 NODE_ENV default value는 development. local.EXT 가 있을 시 local이 마지막으로 로드되니 주의
  // window 사용 시 cross-env 이용
  logger.log(`profile : ${process.env.NODE_ENV || 'development'}`);
  logger.log(`Application running on port : ${port}`);
}
bootstrap();
