import { Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { configService } from 'src/config.service';
import { rethrowRpcException } from 'src/filters/re-throw-rpc-exception';

@Controller('email')
export class EmailController {
  constructor(
    @Inject(configService.getServiceConfigs().emailService.name)
    private emailServiceClient: ClientProxy,
  ) {}

  @Post('signup')
  @HttpCode(204)
  sendSignupEmail() {
    this.emailServiceClient
      .send('email_signup', { email: 'example@email.com' })
      .subscribe(); // since send() returns observable we need to subscribe to the call to make it execute
  }

  @Post('event/user-created')
  @HttpCode(204)
  emitUserCreatedEvent() {
    this.emailServiceClient
      .emit('user_created', { email: 'example@email.com' })
      .pipe(catchError((e) => rethrowRpcException(e)));
  }
}
