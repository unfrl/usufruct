export const authConfig = {
  secret: process.env.AUTH_SECRET || 'superSecret',
  rounds: process.env.AUTH_ROUNDS || 10,
  expiresIn: process.env.AUTH_EXPIRES_IN || '7d',
};
