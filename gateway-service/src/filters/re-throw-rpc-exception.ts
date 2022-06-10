import { RpcException } from '@nestjs/microservices';

/**
 * Take what is supposed to be an RpcException and convert it into a proper RpcException that can be caught by the filter.
 * The errors in the state services throw them are not seen as RpcException and have to rethrown
 */
export const rethrowRpcException = (e: RpcException) => {
  throw new RpcException(e);
};
