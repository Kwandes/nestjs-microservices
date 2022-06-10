import { Transport } from '@nestjs/microservices';

export const ServiceInfo = {
  authService: {
    name: 'AUTH_SERVICE',
    options: { host: '0.0.0.0', port: 3001 },
    transport: Transport.TCP,
  },
};
