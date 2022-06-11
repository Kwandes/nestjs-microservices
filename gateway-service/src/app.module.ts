import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { ChargerModule } from './charger/charger.module';
import { EmailModule } from './email/email.module';
import { LoggerMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [AuthenticationModule, ChargerModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
