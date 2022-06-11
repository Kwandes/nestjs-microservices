import { ChargerStatusEnum } from './charger-status.enum';
import { ICharger } from './charger.interface';

export const chargers: ICharger[] = [
  { id: '1', name: 'CHARGER.001', status: ChargerStatusEnum.available },
  { id: '2', name: 'CHARGER.002', status: ChargerStatusEnum.available },
  { id: '3', name: 'CHARGER.003', status: ChargerStatusEnum.occupied },
  { id: '4', name: 'CHARGER.004', status: ChargerStatusEnum.occupied },
  { id: '5', name: 'CHARGER.005', status: ChargerStatusEnum.unavilable },
];
