import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { envConfig } from './env.config';
const { isProduction, isDevelopment } = envConfig;

const type = 'postgres';
const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT || 5432);
const username = process.env.DB_USERNAME || 'local';
const password = process.env.DB_PASSWORD || 'local';
const database = process.env.DB_NAME || 'usufruct';
const entities = ['dist/**/*.entity{.ts,.js}'];
const synchronize = isDevelopment;
const namingStrategy = new SnakeNamingStrategy();

export const dbConfig: TypeOrmModuleOptions = isProduction
  ? {
      type,
      host,
      port,
      synchronize,
      entities,
      namingStrategy,
    }
  : {
      type,
      host,
      port,
      username,
      password,
      database,
      entities,
      synchronize,
      namingStrategy,
    };
