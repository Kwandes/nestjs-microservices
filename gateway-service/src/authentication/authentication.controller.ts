import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ServiceInfo } from 'src/service-info.constant';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(ServiceInfo.authService.name)
    private authServiceClient: ClientProxy,
  ) {}

  @Post('login')
  login(): Observable<{ accessToken: string }> {
    return this.authServiceClient.send('auth_login', {});
  }

  @Post('signup')
  signup(): Observable<{ accessToken: string }> {
    return this.authServiceClient.send('auth_signup', {});
  }

  @Get('error')
  errorExample(): Observable<void> {
    return this.authServiceClient.send('auth_error_example', {});
  }
}
