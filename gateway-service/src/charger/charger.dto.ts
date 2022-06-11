import { IsEnum, IsNotEmpty } from 'class-validator';
import { ChargerStatusEnum } from './charger-status.enum';

export class UpdateChargerDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEnum(ChargerStatusEnum)
  status: ChargerStatusEnum;
}
