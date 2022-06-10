import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

/**
 * NestJs filter for the RpcException.
 * Note: the errors in the state services throw them are not seen as RpcException and have to rethrown, henve re-throw-rpc-exception.ts
 */
@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  public catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = (
      exception.getError() as unknown as { status: string; message: string }
    ).status;

    const statusCode = this.rpcStatusToHttpStatus(status);
    return response
      .status(statusCode)
      .json({ statusCode: statusCode, error: exception.message });
  }

  private rpcStatusToHttpStatus(status: string): HttpStatus {
    switch (status) {
      case 'BAD_REQUEST':
        return HttpStatus.BAD_REQUEST;
      case 'NOT_FOUND':
        return HttpStatus.NOT_FOUND;
      case 'UNAUTHORIZED':
        return HttpStatus.UNAUTHORIZED;
      case 'FORBIDDEN':
        return HttpStatus.FORBIDDEN;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
