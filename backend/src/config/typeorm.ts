import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

// Load environment variables BEFORE using ConfigService
dotenvConfig({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

// Define Database Configuration Interface
type DatabaseConfig = DataSourceOptions & {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  migrations: string[];
  autoLoadEntities?: boolean;
  synchronize?: boolean;
  ssl?: boolean;
  logging?: boolean | string[];
};

// Factory to be used in AppModule (NestJS context)
export const typeormConfigFactory = (
  configService: ConfigService,
): DatabaseConfig => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_DATABASE', 'postgres'),
  entities: [path.join(__dirname, '..', '/database/**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', '/database/migrations/*.{ts,js}')],
  autoLoadEntities: true,
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
  logging: configService.get<string>('NODE_ENV') === 'development',
  ssl: false,
});

// Default config to register with NestJS ConfigModule
export default registerAs<DatabaseConfig>(
  'typeorm',
  (): DatabaseConfig => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'postgres',
    entities: [],
    migrations: [],
  }),
);

// CLI-compatible DataSource for TypeORM
export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'postgres',
  entities: [path.join(__dirname, '..', '/database/**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '..', '/database/migrations/*.{ts,js}')],
  migrationsTableName: 'migrations',
  migrationsRun: process.env.NODE_ENV === 'production',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  ssl: false,
});
