import { TransactionStatusEnum } from './transaction-status.enum';

export interface ITransaction {
  id: string;
  status: TransactionStatusEnum;
  value: number;
  chargerId: string;
  userId: string;
}
