import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { configService } from './config.service';

async function bootstrap() {
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
  await app.listen();
  Logger.log(
    `Email Service started on ${config.options.host}:${config.options.port} `,
  );
}
bootstrap();
