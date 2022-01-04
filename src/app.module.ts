import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule, AuthModule],
})
export class AppModule {}
