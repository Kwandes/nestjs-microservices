import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcExceptionFilter } from './filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new RpcExceptionFilter()); // Nestjs doesn't handle RpcExceptions by default so we use a custom filter
  await app.listen(3000);
}
bootstrap();
