import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { configService } from '../config.service';
import { rethrowRpcException } from '../filters/re-throw-rpc-exception';
import { LoginDto, SignupDto } from './auth.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(configService.getServiceConfigs().authService.name)
    private authServiceClient: ClientProxy,
  ) {}

  @Post('login')
  login(
    @Body() request: LoginDto,
  ): Observable<{ id: string; username: string; accessToken: string }> {
    return this.authServiceClient
      .send('auth_authenticate', request)
      .pipe(catchError((e) => rethrowRpcException(e)));
  }

  @Post('signup')
  signup(
    @Body() request: SignupDto,
  ): Observable<{ id: string; username: string; accessToken: string }> {
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
