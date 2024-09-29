import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enable transformation
      whitelist: true, // Automatically strip properties not in the DTO
    }),
  );
  app.use(
    ['/api-docs'],
    basicAuth({
      users: { [process.env['SWAGGER_USER']]: process.env['SWAGGER_PASSWORD'] }, // Username: admin, Password: password123
      challenge: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('StephenVinuya - Portfolio API')
    .setDescription('The portfolio api')
    .setVersion('1.0')
    .addTag('Portfolio Management')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(+process.env['PORT'], '0.0.0.0');
}

bootstrap();
