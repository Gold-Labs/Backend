import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './startegy/local.strategy';
import { AuthenticationController } from './authentication.controller';
import { jwtConstants } from './types/constatnts';
import { JwtStrategy } from './startegy/jwt.strategy';
import { GoogleStrategy } from './startegy/google.strategy';
import { GoogleAuthenticationController } from './types/googleAuth.controller';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthenticationService],
  controllers: [AuthenticationController, GoogleAuthenticationController],
})
export class AuthenticationModule {}
