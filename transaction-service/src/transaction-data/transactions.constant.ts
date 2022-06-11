import { TransactionStatusEnum } from './transaction-status.enum';
import { ITransaction } from './transaction.interface';

export const transactions: ITransaction[] = [
  {
    id: '1',
    status: TransactionStatusEnum.active,
    value: 5,
    chargerId: '1',
    userId: '1',
  },
  {
    id: '2',
    status: TransactionStatusEnum.active,
    value: 5,
    chargerId: '2',
    userId: '1',
  },
  {
    id: '3',
    status: TransactionStatusEnum.active,
    value: 5,
    chargerId: '3',
    userId: '1',
  },
  {
    id: '4',
    status: TransactionStatusEnum.inactive,
    value: 17,
    chargerId: '1',
    userId: '1',
  },
  {
    id: '5',
    status: TransactionStatusEnum.inactive,
    value: 20,
    chargerId: '2',
    userId: '1',
  },
  {
    id: '6',
    status: TransactionStatusEnum.inactive,
    value: 23,
    chargerId: '1',
    userId: '1',
  },
  {
    id: '7',
    status: TransactionStatusEnum.inactive,
    value: 26,
    chargerId: '1',
    userId: '1',
  },
];
