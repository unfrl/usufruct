export const authConfig = {
  secret: process.env.AUTH_SECRET || 'superSecret',
  rounds: process.env.AUTH_ROUNDS || 10,
};
