import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'boards_app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
