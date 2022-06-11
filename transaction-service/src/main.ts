import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { configService } from './config.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const config = configService.getServiceConfigs().transactionService;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: config.options.host,
        port: config.options.port,
      },
    },
  );
  app.useGlobalInterceptors(new LoggingInterceptor()); // Log the incoming requests
  await app.listen();
  Logger.log(
    `Transaction Service started on ${config.options.host}:${config.options.port} `,
  );
}
bootstrap();
