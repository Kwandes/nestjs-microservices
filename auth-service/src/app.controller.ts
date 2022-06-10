import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

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

  /**
   * Method that exists only to showcase error handling with RPC
   */
  @MessagePattern('auth_error_example')
  async errorExample(): Promise<void> {
    // Since communication is done over TCP instead oif just HTTP, we should actually throw RpcException instead of the usual HttpException and things like BadRequestException
    throw new RpcException({
      status: 'BAD_REQUEST', // one of the codes corresponding to what's defined in GatewayService/rpc-exception.filter.ts
      message: 'RPC Exception Example',
    });
  }
}
