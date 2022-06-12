import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
      imports: [AppModule],
    }).compile();

    // Setup the app instance
    app = moduleFixture.createNestApplication();

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
    // Wait for connection with the required microservice(s)
    authClient = app.get(configService.getServiceConfigs().authService.name);
    await authClient.connect();
  });

  describe('Microservice connection', () => {
    it('is established with AuthService', () => {
      expect(authClient).toBeDefined();
    });
  });

  describe('POST /auth/login', () => {
    it('Should return status 201 and a user object with access token', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'exmple@user.com', password: 'password' })
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body).toHaveProperty('username');
          expect(response.body).toHaveProperty('accessToken');
        });
    });

    it('Should return status 400 on missing request body', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .expect(400)
        .expect((response) => {
          expect(response.body?.message).toContain(
            'username must be shorter than or equal to 255 characters',
          );
          expect(response.body?.message).toContain(
            'username should not be empty',
          );
          expect(response.body?.message).toContain(
            'username must be shorter than or equal to 255 characters',
          );
          expect(response.body?.message).toContain(
            'password should not be empty',
          );
        });
    });
  });

  describe('POST /auth/signup', () => {
    it('Should return status 201 and a user object with access token', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ username: 'exmple@user.com', password: 'password' })
        .expect(201)
        .expect((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body).toHaveProperty('username');
          expect(response.body).toHaveProperty('accessToken');
        });
    });

    it('Should return status 400 on missing request body', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .expect(400)
        .expect((response) => {
          expect(response.body?.message).toContain(
            'username must be shorter than or equal to 255 characters',
          );
          expect(response.body?.message).toContain(
            'username should not be empty',
          );
          expect(response.body?.message).toContain(
            'username must be shorter than or equal to 255 characters',
          );
          expect(response.body?.message).toContain(
            'password should not be empty',
          );
        });
    });
  });

  afterAll(async () => {
    await app.close();
    await authClient.close();
  });
});
