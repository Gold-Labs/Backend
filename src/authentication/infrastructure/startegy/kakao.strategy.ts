import { AuthenticationService } from 'src/authentication/domain/service/authentication.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthVendor } from 'src/user/domain/type/auth-vendor.enum';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService, private readonly authService: AuthenticationService) {
    super({
      clientID: configService.get('KAKAO_AUTH_CLIENT_ID'),
      clientSecret: configService.get('KAKAO_AUTH_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/kakao/redirect',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any, info?: any) => void) {
    const userInfo = this.getUserInfo(profile);
    console.log(userInfo);
    const user = await this.authService.registerOauthUser(userInfo, AuthVendor.KAKAO);
    done(null, user);
  }

  getUserInfo(profile: any) {
    const { displayName, _json } = profile;
    const {
      kakao_account: { email },
    } = _json;
    return { displayName, email };
  }
}
