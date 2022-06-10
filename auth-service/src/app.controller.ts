import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('auth_login')
  async login(): Promise<{ accessToken: string }> {
    return {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZSI6ImlzIG5ldmVyIGdvbm5hIGdpdmUgeW91IHVwIn0.MAYF4ohuyugFRQR60VOCIoPt_BYpdyAUaSUrZMQzfc8',
    };
  }

  @MessagePattern('auth_signup')
  async signup(): Promise<{ accessToken: string }> {
    return {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZSI6ImlzIG5ldmVyIGdvbm5hIGdpdmUgeW91IHVwIn0.MAYF4ohuyugFRQR60VOCIoPt_BYpdyAUaSUrZMQzfc8',
    };
  }

  @MessagePattern('auth_error_example')
  async errorExample(): Promise<void> {
    throw new BadRequestException(
      'This is an example HTTP Bad request exception throw by AuthService on TCP',
    );
  }
}
