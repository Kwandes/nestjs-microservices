import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { configService } from './config.service';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  // If the email service ever needs to support multiple transport layers it should instead be implemneted as a hybrid application
  // Example use case: support receiving messages over TCP and events via Kafka,
  // https://docs.nestjs.com/faq/hybrid-application
  const config = configService.getServiceConfigs().emailService;
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
    `Email Service started on ${config.options.host}:${config.options.port} `,
  );
}
bootstrap();
