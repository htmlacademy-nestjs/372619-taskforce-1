import { registerAs } from '@nestjs/config';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Radix } from '@project/libs/shared-types';
import { DbEnv } from '../dv.env';

const DEFAULT_POSTGRESQL_PORT = 5432;

export interface DbConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
}

export default registerAs('db', (): DbConfig => {
  const config: DbConfig = {
    name: process.env.TASK_DB_NAME,
    host: process.env.TASK_DB_HOST,
    port: parseInt(
      process.env.TASK_DB_PORT ?? DEFAULT_POSTGRESQL_PORT.toString(),
      Radix.Decimal
    ),
    user: process.env.TASK_DB_USER,
    password: process.env.TASK_DB_PASSWORD,
  };

  const dbEnv = plainToInstance(DbEnv, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(dbEnv, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    throw new Error(`[DB config]: Environments validation failed. Please check .task.env file.
      Error message: ${errors.toString()}`);
  }

  return config;
});
