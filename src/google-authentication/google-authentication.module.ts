import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthenticationModule } from './../authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { GoogleAuthenticationController } from './google-authentication.controller';
import { GoogleAuthenticationService } from './google-authentication.service';
import { jwtConstants } from 'src/authentication/constatnts';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    AuthenticationModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [GoogleAuthenticationController],
  providers: [GoogleAuthenticationService],
})
export class GoogleAuthenticationModule {}
