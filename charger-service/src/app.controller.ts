import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { ChargerStatusEnum } from './charger-data/charger-status.enum';
import { ICharger } from './charger-data/charger.interface';
import { chargers } from './charger-data/chargers.constant';
import { configService } from './config.service';

@Controller()
export class AppController {
  constructor(
    @Inject(configService.getServiceConfigs().transactionService.name)
    private transactionServiceClient: ClientProxy,
  ) {}

  chargers = chargers;

  @MessagePattern('charger_get_all')
  async get(): Promise<ICharger[]> {
    return this.chargers;
  }

  @MessagePattern('charger_update')
  async update(request: {
    id: string;
    status: ChargerStatusEnum;
  }): Promise<ICharger[]> {
    let found = false;
    this.chargers.forEach((charger) => {
      if (charger.id === request.id) {
        charger.status = request.status;
        found = true;
      }
    });
    if (!found) {
      throw new RpcException({
        status: 'NOT_FOUND',
        message: `Charger with id ${request.id} was not found.`,
      });
    }
    this.transactionServiceClient.emit('charger_updated', {
      id: request.id,
      status: request.status,
    });
    return this.chargers;
  }
}
