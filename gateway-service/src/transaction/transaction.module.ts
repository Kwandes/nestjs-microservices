import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { configService } from 'src/config.service';
import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController],
  imports: [
    ClientsModule.register([
      configService.getServiceConfigs().transactionService,
    ]),
  ],
})
export class TransactionModule {}
