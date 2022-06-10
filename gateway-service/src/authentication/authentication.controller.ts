import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { rethrowRpcException } from 'src/filters/re-throw-rpc-exception';
import { ServiceInfo } from 'src/service-info.constant';
import { LoginDto, SignupDto } from './auth.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(ServiceInfo.authService.name)
    private authServiceClient: ClientProxy,
  ) {}

  @Post('login')
  login(@Body() request: LoginDto): Observable<{ accessToken: string }> {
    return this.authServiceClient
      .send('auth_login', request)
      .pipe(catchError((e) => rethrowRpcException(e)));
  }

  @Post('signup')
  signup(@Body() request: SignupDto): Observable<{ accessToken: string }> {
    return this.authServiceClient
      .send('auth_signup', request)
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
