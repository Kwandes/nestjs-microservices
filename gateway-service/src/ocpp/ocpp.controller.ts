import { Controller, Get } from '@nestjs/common';
import { ChargerStatusEnum } from './charger-status.enum';
import { ICharger } from './charger.interface';

@Controller('ocpp')
export class OcppController {
  @Get('')
  async getChargers(): Promise<ICharger[]> {
    return [
      { id: '1', name: 'example1', status: ChargerStatusEnum.available },
      { id: '2', name: 'example2', status: ChargerStatusEnum.available },
      { id: '3', name: 'example3', status: ChargerStatusEnum.occupied },
      { id: '4', name: 'example4', status: ChargerStatusEnum.occupied },
      { id: '5', name: 'example5', status: ChargerStatusEnum.unavilable },
    ];
  }
}
