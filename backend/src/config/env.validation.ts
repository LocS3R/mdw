// src/config/env.validation.ts
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  //   @IsString()
  //   JWT_SECRET: string;

  //   @IsString()
  //   JWT_EXPIRES_IN: string;

  @IsString()
  FRONTEND_URL: string;
}

export function validate(config: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return validatedConfig;
}
