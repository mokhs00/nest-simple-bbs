import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  database: process.env.DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
