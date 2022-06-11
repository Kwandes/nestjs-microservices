import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { configService } from '../config.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  controllers: [AuthenticationController],
  imports: [
    ClientsModule.register([configService.getServiceConfigs().authService]),
  ],
})
export class AuthenticationModule {}
