import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailModule } from './email/email.module';
import { OcppModule } from './ocpp/ocpp.module';

@Module({
  imports: [AuthenticationModule, OcppModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
