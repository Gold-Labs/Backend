// 1.어떤 전략인지  extending하자  우린 local이다.
// 2. validate() 구현해라

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';

//auth guard 구현

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super({ usernameField: 'email' });
  }
  // request.user의 값을 넣어준다.
  async validate(email: string, password: string) {
    const user = await this.authService.getAuthenticatedUser(email, password);
    return user;
  }
}
