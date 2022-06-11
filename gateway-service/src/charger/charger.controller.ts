import { Body, Controller, Get, Inject, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { configService } from '../config.service';
import { rethrowRpcException } from '../filters/re-throw-rpc-exception';
import { UpdateChargerDto } from './charger.dto';
import { ICharger } from './charger.interface';

@Controller('charger')
export class ChargerController {
  constructor(
    @Inject(configService.getServiceConfigs().chargerService.name)
    private chargerServiceClient: ClientProxy,
  ) {}

  @Get('')
  getChargers(): Observable<ICharger[]> {
    return this.chargerServiceClient
      .send('charger_get_all', {})
      .pipe(catchError((e) => rethrowRpcException(e)));
  }

  @Patch('')
  updateCharger(@Body() request: UpdateChargerDto): Observable<ICharger[]> {
    return this.chargerServiceClient
      .send('charger_update', request)
      .pipe(catchError((e) => rethrowRpcException(e)));
  }
}
