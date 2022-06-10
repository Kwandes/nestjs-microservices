import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  @EventPattern('user_created')
  userCreatedHandler(data: Record<string, unknown>): void {
    Logger.debug(`User created with email ${data?.email}`);
  }

  @MessagePattern('email_signup')
  signupEmail(request: { email: string }): Observable<void> {
    Logger.debug(`Email sent to ${request.email}`);
    return;
  }
}
