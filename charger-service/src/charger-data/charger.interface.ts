import { ChargerStatusEnum } from './charger-status.enum';

export interface ICharger {
  id: string;
  name: string;
  status: ChargerStatusEnum;
}
