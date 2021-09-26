import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { GoogleAuthenticationController } from './google-authentication/google-authentication.controller';
import { GoogleAuthenticationModule } from './google-authentication/google-authentication.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, GoogleAuthenticationModule, UserModule],
  controllers: [AppController, GoogleAuthenticationController],
  providers: [AppService],
})
export class AppModule {}
