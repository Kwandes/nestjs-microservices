import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { configService } from 'src/config.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  controllers: [AuthenticationController],
  imports: [
    ClientsModule.register([
      // Auth Service
      configService.getServiceConfigs().authService,
      {
        transport: Transport.TCP,
        name: configService.getServiceConfigs().authService.name,
        options: configService.getServiceConfigs().authService.options,
      },
    ]),
  ],
})
export class AuthenticationModule {}
