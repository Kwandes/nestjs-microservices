import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChargerStatusEnum } from './charger-data/charger-status.enum';
import { ICharger } from './charger-data/charger.interface';
import { chargers } from './charger-data/chargers.constant';

@Controller()
export class AppController {
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
    this.chargers.forEach((charger) => {
      if (charger.id === request.id) {
        charger.status = request.status;
      }
    });
    // TODO - emit event `charger_updated`
    return this.chargers;
  }
}
