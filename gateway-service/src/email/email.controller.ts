import { Controller, HttpCode, Logger, Post } from '@nestjs/common';

@Controller('email')
export class EmailController {
  @Post('signup')
  @HttpCode(204)
  sendSignupEmail(): void {
    Logger.debug('Signup email sent');
  }
}
