import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

const port = process.env.PORT || 1337;
const origins = ['http://localhost:3000'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: origins,
  });
  app.useGlobalPipes(new ValidationPipe());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Usufruct')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(swaggerDoc));

  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(port);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
