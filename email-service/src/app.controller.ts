import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  @EventPattern('user_created')
  userCreatedHandler(data: Record<string, unknown>): void {
    return;
  }

  @MessagePattern('email_signup')
  signupEmail(request: { email: string }): Observable<void> {
    return;
  }
}
