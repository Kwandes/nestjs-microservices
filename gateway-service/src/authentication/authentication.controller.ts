import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { rethrowRpcException } from 'src/filters/re-throw-rpc-exception';
import { ServiceInfo } from 'src/service-info.constant';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(ServiceInfo.authService.name)
    private authServiceClient: ClientProxy,
  ) {}

  @Post('login')
  login(): Observable<{ accessToken: string }> {
    return this.authServiceClient
      .send('auth_login', {})
      .pipe(catchError((e) => rethrowRpcException(e)));
  }

  @Post('signup')
  signup(): Observable<{ accessToken: string }> {
    return this.authServiceClient
      .send('auth_signup', {})
      .pipe(catchError((e) => rethrowRpcException(e)));
  }

  /**
   * Endpoint that exists only to showcase error handling with RPC
   */
  @Get('error')
  errorExample(): Observable<void> {
    return this.authServiceClient
      .send('auth_error_example', {})
      .pipe(catchError((e) => rethrowRpcException(e))); // rethrow any errors for exception handling
  }
}
