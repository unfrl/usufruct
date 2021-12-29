const env = process.env.NODE_ENV || 'development';
const isDevelopment = env === 'development';
const isProduction = env === 'production';
const openApiGenerationOnly = Boolean(
  process.env.OPEN_API_GENERATION_ONLY || false,
);

export const envConfig = {
  env,
  isDevelopment,
  isProduction,
  openApiGenerationOnly,
};
