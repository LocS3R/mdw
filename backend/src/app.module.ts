import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './modules/album/album.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './config/env.validation';
import typeormConfig, { typeormConfigFactory } from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validate,
      load: [typeormConfig], // Load typeorm configuration
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfigFactory, // Sử dụng factory đã tách ra
    }),
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
