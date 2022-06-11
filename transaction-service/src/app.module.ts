import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { configService } from './config.service';

@Module({
  controllers: [AppController],
  imports: [
    ClientsModule.register([configService.getServiceConfigs().authService]),
    ClientsModule.register([configService.getServiceConfigs().chargerService]),
    ClientsModule.register([
      configService.getServiceConfigs().transactionService,
    ]),
  ],
})
export class AppModule {}
