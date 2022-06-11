import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('CHARGER');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const pattern = context.switchToRpc().getContext<TcpContext>().getPattern();
    const data = context.switchToRpc().getData();
    this.logger.verbose(
      `Received '${pattern}' with data: ${JSON.stringify(data)}`,
    );
    return next.handle();
  }
}
