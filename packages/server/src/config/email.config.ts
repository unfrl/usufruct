import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const emailHost = process.env.EMAIL_HOST || 'localhost';
const emailPort = Number(process.env.EMAIL_PORT || 1025);
const emailAuthUser = process.env.EMAIL_AUTH_USER || 'unfrl@fakeemail.com';
const emailPassword = process.env.EMAIL_AUTH_PASSWORD || '';
const emailTLS = Boolean(process.env.EMAIL_IGNORE_TLS || true);
const emailSecure = Boolean(process.env.EMAIL_SECURE || false);

export const mailModuleConfig: MailerOptions = {
  transport: {
    host: emailHost,
    port: emailPort,
    ignoreTLS: emailTLS,
    secure: emailSecure,
    auth: {
      user: emailAuthUser,
      pass: emailPassword,
    },
  },
  defaults: {
    from: 'Unfrl LLC <noreply@usufruct+unfrl.com>',
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(), // or new PugAdapter()
    options: {
      strict: true,
    },
  },
};
