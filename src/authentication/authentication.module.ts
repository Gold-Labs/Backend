import { KakaoAuthController } from './application/kakao-auth.controller';
import { KakaoStrategy } from './infrastructure/startegy/kakao.strategy';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './domain/service/authentication.service';
import { LocalStrategy } from './infrastructure/startegy/local.strategy';
import { AuthenticationController } from './application/authentication.controller';
import { jwtConstants } from './infrastructure/types/constatnts';
import { JwtStrategy } from './infrastructure/startegy/jwt.strategy';
import { GoogleStrategy } from './infrastructure/startegy/google.strategy';
import { GoogleAuthController } from './application/google-auth.controller';
import { NaverAuthController } from './application/naver-auth.controller';
import { NaverStrategy } from './infrastructure/startegy/naver.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, GoogleStrategy, ConfigService, KakaoStrategy, NaverStrategy],
  exports: [AuthenticationService],
  controllers: [AuthenticationController, GoogleAuthController, KakaoAuthController, NaverAuthController],
})
export class AuthenticationModule {}
