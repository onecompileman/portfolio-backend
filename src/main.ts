import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Enable transformation
    whitelist: true, // Automatically strip properties not in the DTO
  }));

  const config = new DocumentBuilder()
    .setTitle('StephenVinuya - Portfolio API')
    .setDescription('The portfolio api')
    .setVersion('1.0')
    .addTag('Portfolio Management')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}

bootstrap();
