import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { configService } from './config.service';

@Controller()
export class AppController {
  constructor(
    @Inject(configService.getServiceConfigs().emailService.name)
    private emailServiceClient: ClientProxy,
  ) {}

  @MessagePattern('auth_login')
  async login(request: {
    username: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    return {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZSI6ImlzIG5ldmVyIGdvbm5hIGdpdmUgeW91IHVwIn0.MAYF4ohuyugFRQR60VOCIoPt_BYpdyAUaSUrZMQzfc8',
    };
  }

  @MessagePattern('auth_signup')
  async signup(request: {
    username: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    // Emit an event for user created
    this.emailServiceClient.emit('user_created', { email: request.username });
    // Return a supposed access token to mimic authenticaiton being implemnented
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
