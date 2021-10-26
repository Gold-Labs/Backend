import { AuthenticationService } from 'src/authentication/domain/service/authentication.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthVendor } from 'src/user/domain/type/auth-vendor.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService, private readonly authService: AuthenticationService) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { displayName, emails } = profile;
    console.log(profile);
    const email = emails[0]?.value;
    const user = await this.authService.registerOauthUser(email, AuthVendor.GOOGLE);
    done(null, user);
  }
}
