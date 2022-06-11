import { IsEnum, IsNotEmpty, Max, MaxLength, Min } from 'class-validator';
import { TransactionStatusEnum } from './transaction-status.enum';

export class StartTransactionDto {
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @IsNotEmpty()
  @MaxLength(255)
  chargerId: string;
}

export class UpdateTransactionDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEnum(TransactionStatusEnum)
  status: TransactionStatusEnum;

  @Max(666666)
  @Min(0)
  value: number;
}

export class StopTransactionDto {
  @IsNotEmpty()
  id: string;
}
