import { AuthenticationService } from 'src/authentication/domain/service/authentication.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { AuthVendor } from 'src/user/domain/type/auth-vendor.enum';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private readonly configService: ConfigService, private readonly authService: AuthenticationService) {
    super({
      clientID: configService.get('NAVER_AUTH_CLIENT_ID'),
      clientSecret: configService.get('NAVER_AUTH_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/naver/redirect',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any, info?: any) => void) {
    const userInfo = this.getUserInfo(profile);
    const user = await this.authService.registerOauthUser(userInfo, AuthVendor.NAVER);
    done(null, user);
  }

  getUserInfo(profile: any) {
    const { displayName, emails } = profile;
    const email = emails[0].value;
    return { displayName: displayName ? displayName : email, email };
  }
}
