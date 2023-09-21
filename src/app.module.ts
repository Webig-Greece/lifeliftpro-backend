import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: config.get('database.host'),
      port: config.get('database.port'),
      username: config.get('database.username'),
      password: config.get('database.password'),
      database: config.get('database.database'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: config.get('database.synchronize'),
      logging: config.get('database.logging'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
