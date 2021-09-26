import { Injectable } from '@nestjs/common';
import { google, Auth } from 'googleapis';
@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly configService,
    private readonly userService: UserService,
  ) {
    const clientID = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);

    const email = tokenInfo.email;

    return this.registerUser(token, email);
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserData(token);
  }
}
