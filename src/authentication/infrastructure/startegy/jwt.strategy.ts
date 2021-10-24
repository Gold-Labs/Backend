import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../types/constatnts';

// 여기서 AuthGuard('jwt')를 정해준다. 내부적으로
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //검증은 이미 구현되어 있어서 안해줘도 된다.
  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, email: payload.email };
  }
}
