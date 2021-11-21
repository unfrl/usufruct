import * as IORedis from 'ioredis';
const host = process.env.REDIS_HOST || 'localhost';
const port = Number(process.env.REDIS_PORT || 6379);

export const redisConfig: IORedis.RedisOptions = {
  port,
  host,
  keyPrefix: 'usufruct', //Any value from IORedisOptions can also be set
};
