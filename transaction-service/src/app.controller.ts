import { Controller, Inject, Logger } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ChargerStatusEnum } from './charger-stuff/charger-status.enum';
import { ICharger } from './charger-stuff/charger.interface';
import { configService } from './config.service';
import { TransactionStatusEnum } from './transaction-data/transaction-status.enum';
import { ITransaction } from './transaction-data/transaction.interface';
import { transactions } from './transaction-data/transactions.constant';

@Controller()
export class AppController {
  private logger = new Logger('TRANSACTION');

  constructor(
    @Inject(configService.getServiceConfigs().authService.name)
    private authServiceClient: ClientProxy,
    @Inject(configService.getServiceConfigs().chargerService.name)
    private chargerServiceClient: ClientProxy,
    @Inject(configService.getServiceConfigs().transactionService.name)
    private transactionServiceClient: ClientProxy,
  ) {}

  tranactions = transactions;

  @MessagePattern('transaction_get_all')
  async get(): Promise<ITransaction[]> {
    return this.tranactions;
  }

  @MessagePattern('transaction_start')
  async start(request: {
    username: string;
    password: string;
    chargerId: string;
  }): Promise<ITransaction> {
    // Validate that the charger exists
    const chargers: ICharger[] = await firstValueFrom(
      this.chargerServiceClient.send('charger_get_all', {}),
    );
    let found: ICharger;
    chargers.forEach((charger) => {
      if (charger.id === request.chargerId) {
        found = charger;
      }
    });
    if (!found) {
      throw new RpcException({
        status: 'BAD_REQUEST',
        message: `Charger with id ${request.chargerId} was not found.`,
      });
    }
    if (found.status != ChargerStatusEnum.available) {
      throw new RpcException({
        status: 'BAD_REQUEST',
        message: `Charger with id ${request.chargerId} is not currently available.`,
      });
    }

    // Authenticate the user
    const authResponse: { id: string; username: string; password: string } =
      await firstValueFrom(
        this.authServiceClient.send('auth_authenticate', {
          username: request.username,
          password: request.password,
          chargerId: request.chargerId,
        }),
      );
    if (!authResponse) {
      throw new RpcException({
        status: 'UNAUTHORIZED',
        message: `You are not authorized to start this transaction.`,
      });
    }

    // Create a new transaction
    const newTransaction: ITransaction = {
      id: this.tranactions.length.toString(),
      status: TransactionStatusEnum.active,
      value: 0,
      chargerId: request.chargerId,
      userId: authResponse.id,
    };
    this.logger.debug(`New transaction ${JSON.stringify(newTransaction)}`);

    this.tranactions.push(newTransaction);
    return newTransaction;
  }

  @MessagePattern('transaction_update')
  async update(request: {
    id: string;
    status: TransactionStatusEnum;
    value: number;
  }): Promise<ITransaction> {
    // Check that transaction exists
    let found: ITransaction;
    this.tranactions.forEach((tranaction) => {
      if (tranaction.id === request.id) {
        tranaction.status = request.status;
        tranaction.value = request.value;
        found = tranaction;
      }
    });
    if (!found) {
      throw new RpcException({
        status: 'BAD_REQUEST',
        message: `Transaction with id ${request.id} was not found.`,
      });
    }

    this.transactionServiceClient.emit('transaction_updated', {
      id: found.id,
      status: found.status,
      value: found.value,
    });
    return found;
  }

  @MessagePattern('transaction_stop')
  async stop(request: { id: string }): Promise<ITransaction> {
    // Check that transaction exists
    let found: ITransaction;
    this.tranactions.forEach((tranaction) => {
      if (tranaction.id === request.id) {
        tranaction.status = TransactionStatusEnum.inactive;
        found = tranaction;
      }
    });
    if (!found) {
      throw new RpcException({
        status: 'NOT_FOUND',
        message: `Transaction with id ${request.id} was not found.`,
      });
    }
    this.logger.debug(`Transaction ${JSON.stringify(found)} stopped`);
    return found;
  }

  @EventPattern('transaction_updated')
  transactionUpdatedHandler(data: Record<string, unknown>): void {
    if (data.status === TransactionStatusEnum.inactive) {
      this.stop({ id: data.id as string });
    }
  }

  @EventPattern('charger_updated')
  chargerUpdatedHandler(data: Record<string, unknown>): void {
    //  If a cahrger becomes unavailable, stop all transactions for that charger
    if (data.status === ChargerStatusEnum.unavilable) {
      this.tranactions.forEach((transaction) => {
        if (transaction.chargerId === (data.id as string)) {
          this.stop({ id: transaction.id });
        }
      });
    }
  }
}
