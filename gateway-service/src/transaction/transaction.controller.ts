import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { configService } from '../config.service';
import { rethrowRpcException } from '../filters/re-throw-rpc-exception';
import {
  StartTransactionDto,
  StopTransactionDto,
  UpdateTransactionDto,
} from './transaction.dto';
import { ITransaction } from './transaction.interface';

@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject(configService.getServiceConfigs().transactionService.name)
    private transactionServiceClient: ClientProxy,
  ) {}

  @Get('')
  get(): Observable<ITransaction[]> {
    return this.transactionServiceClient
      .send('transaction_get_all', {})
      .pipe(catchError((e) => rethrowRpcException(e)));
  }

  @Post('')
  start(@Body() request: StartTransactionDto): Observable<ITransaction> {
    return this.transactionServiceClient
      .send('transaction_start', request)
      .pipe(catchError((e) => rethrowRpcException(e)));
  }

  @Patch('')
  update(@Body() request: UpdateTransactionDto): Observable<ITransaction> {
    return this.transactionServiceClient
      .send('transaction_update', request)
      .pipe(catchError((e) => rethrowRpcException(e)));
  }

  @Delete('')
  stop(@Body() request: StopTransactionDto): Observable<ITransaction> {
    return this.transactionServiceClient
      .send('transaction_stop', request)
      .pipe(catchError((e) => rethrowRpcException(e)));
  }
}
