import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { existsSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  try {
    // Kiểm tra file env
    const env = process.env.NODE_ENV || 'development';
    const envPath = join(process.cwd(), `.env.${env}`);
    const defaultEnvPath = join(process.cwd(), '.env');

    console.log('Environment:', env);
    console.log(
      'Using env file:',
      existsSync(envPath)
        ? envPath
        : existsSync(defaultEnvPath)
          ? defaultEnvPath
          : 'No .env file found',
    );

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);

    // Log cấu hình database để debug
    console.log('Database config:', {
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      database: configService.get<string>('DB_DATABASE'),
    });

    const frontendUrl = configService.get<string>('FRONTEND_URL');
    app.enableCors({ origin: frontendUrl });

    // Serve static files from 'uploads' directory
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads',
    });

    const port = configService.get<number>('PORT') || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } catch (err) {
    console.error('Bootstrap failed:', err);
    process.exit(1);
  }
}
bootstrap();
