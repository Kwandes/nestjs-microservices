import { Module } from '@nestjs/common';
import { OcppController } from './ocpp.controller';

@Module({
  controllers: [OcppController],
})
export class OcppModule {}
