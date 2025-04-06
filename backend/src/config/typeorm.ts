import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

// Định nghĩa interface cho cấu hình database
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

// Factory function để tạo cấu hình
export const typeormConfigFactory = (
  configService: ConfigService,
): DatabaseConfig => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_DATABASE', 'postgres'),
  entities: ['dist/database/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
  logging: configService.get<string>('NODE_ENV') === 'development',
  ssl: false,
});

// Đăng ký cấu hình dưới dạng namespace 'typeorm'
export default registerAs<DatabaseConfig>(
  'typeorm',
  (): DatabaseConfig => ({
    // Giá trị mặc định, sẽ được ghi đè bởi ConfigService
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'postgres',
    entities: [],
    migrations: [],
  }),
);

// DataSource instance cho migrations
export const connectionSource = new DataSource({
  ...typeormConfigFactory(new ConfigService()),
  // Ghi đè một số cấu hình cho migrations
  migrationsTableName: 'migrations',
  migrationsRun: false,
});
