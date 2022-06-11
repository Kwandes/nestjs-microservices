import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { configService } from '../config.service';
import { ChargerController } from './charger.controller';

@Module({
  controllers: [ChargerController],
  imports: [
    ClientsModule.register([configService.getServiceConfigs().chargerService]),
  ],
})
export class ChargerModule {}
