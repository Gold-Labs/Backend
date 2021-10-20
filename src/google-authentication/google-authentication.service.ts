import { CreateUserDto } from './../user/domain/dto/createUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { google, Auth } from 'googleapis';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { User } from 'src/user/domain/entities/user.entitiy';
import { UserService } from 'src/user/domain/service/user.service';
import { AuthVendor } from 'src/user/domain/type/auth-vendor.enum';
import { nullCheck } from 'src/util/nullCheck';
@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService,
    private jwtService: JwtService,
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');
    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret); // 우리 사이트 정보 넣어서 oauth client를 만들었다. 이건 우리 사이트에 해당함 사용자가 아님
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    const email = tokenInfo.email;

    if (!email) {
      throw new HttpException('no exist email', HttpStatus.FORBIDDEN);
    }

    let user = await this.userService.getOneByEmail(email);
    if (!user) {
      user = await this.registerUser(token);
    }

    const jwtToken = this.issueJwtToken(user);
    return jwtToken;
  }

  async registerUser(token: string) {
    const userData = await this.getUserData(token);
    const email = userData.email;
    const name = userData.name ?? email;

    if (!email || !name) {
      throw new HttpException('no exist email,name', HttpStatus.FORBIDDEN);
    }

    const newUser: Partial<CreateUserDto> = {
      email,
      name,
      isRegisteredWith: AuthVendor.GOOGLE,
    };
    const user = await this.userService.create(newUser);

    return user;
  }

  async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({ access_token: token });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }

  async issueJwtToken(user: undefined | User) {
    nullCheck(user);
    const payload = { email: user?.email, sub: user?.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
