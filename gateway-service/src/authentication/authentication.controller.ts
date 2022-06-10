import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthenticationController {
  @Post('login')
  async login(): Promise<{ accessToken: string }> {
    return {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZSI6ImlzIG5ldmVyIGdvbm5hIGdpdmUgeW91IHVwIn0.MAYF4ohuyugFRQR60VOCIoPt_BYpdyAUaSUrZMQzfc8',
    };
  }

  @Post('signup')
  async signup(): Promise<{ accessToken: string }> {
    return {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZSI6ImlzIG5ldmVyIGdvbm5hIGdpdmUgeW91IHVwIn0.MAYF4ohuyugFRQR60VOCIoPt_BYpdyAUaSUrZMQzfc8',
    };
  }
}
