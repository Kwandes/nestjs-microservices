import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcExceptionFilter } from './filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new RpcExceptionFilter()); // Nestjs doesn't handle RpcExceptions by default so we use a custom filter
  // Ensure that the requests satisfy certain conditions
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // Strip data of properties without decorators
      whitelist: true,

      // Throw an error if non-whitelisted values are provided
      forbidNonWhitelisted: true,

      // Throw an error if unknown values are provided
      forbidUnknownValues: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
