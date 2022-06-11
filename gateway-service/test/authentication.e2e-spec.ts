import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { configService } from '../src/config.service';
import { RpcExceptionFilter } from '../src/filters/rpc-exception.filter';
import { AppModule } from './../src/app.module';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;
  let authClient: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          {
            ...configService.getServiceConfigs().authService,
            transport: Transport.TCP,
          },
        ]),
      ],
    }).compile();

    // Setup the app instance
    app = moduleFixture.createNestApplication();
    // Setup the relevant micorservice(s)
    app.connectMicroservice({
      transport: Transport.TCP,
      name: configService.getServiceConfigs().authService.name,
      options: configService.getServiceConfigs().authService.options,
    });
    app.startAllMicroservices();
    // Add request validation
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
      }),
    );
    // Add needed filters
    app.useGlobalFilters(new RpcExceptionFilter());
    await app.init();
    authClient = app.get(configService.getServiceConfigs().authService.name);
    await authClient.connect();
    console.log('authClient', authClient);
  });

  describe('POST /auth/login', () => {
    it('Should return status 200 and a user object with access token', () => {
      return (
        request(app.getHttpServer())
          .post('/auth/login')
          .send({ username: 'exmple@user.com', password: 'password' })
          // .expect(200)
          .expect((response) => {
            console.log('response', response.body);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('username');
            expect(response.body).toHaveProperty('accessToken');
          })
      );
    });
  });

  afterAll(async () => {
    await app.close();
    await authClient.close();
  });
});
