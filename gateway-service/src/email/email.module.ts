import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { configService } from '../config.service';
import { EmailController } from './email.controller';

@Module({
  controllers: [EmailController],
  imports: [
    ClientsModule.register([configService.getServiceConfigs().emailService]),
  ],
})
export class EmailModule {}
