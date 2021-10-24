import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/domain/service/user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { nullCheck } from 'src/util/nullCheck';
import { User } from 'src/user/domain/entities/user.entitiy';
import { CreateUserDto } from 'src/user/domain/dto/createUser.dto';
import { AuthVendor } from 'src/user/domain/type/auth-vendor.enum';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  public async register(createUserDto: CreateUserDto) {
    const user = await this.userService.getOneByEmail(createUserDto.email);
    if (user) {
      throw new HttpException('user is already Exist', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const { password, ...result } = newUser;
    return result;
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      /*
       * TODO 이부분 수정 getOneByEmail 보다는 kakao랑 구글로그인 할 때 모두 같을 수 있음
       * 지금은 다르다고 생각하고 하기
       */
      const user = await this.userService.getOneByEmail(email);
      const existUser = nullCheck(user);
      this.verfiedPassWord(hashedPassword, existUser.password!);
      const { password, ...result } = existUser;
      return result;
    } catch (error) {
      throw new HttpException('Wrong credential provided', HttpStatus.BAD_REQUEST);
    }
  }

  public async registerOauthUser(email: string, authVendor: AuthVendor) {
    const isAlreadyRegisteredUser = await this.IsOauthAuthenticatedUser(email, authVendor);
    if (isAlreadyRegisteredUser) {
      return this.userService.getOneByEmail(email);
    }
    console.log('here');
    const newUser = await this.userService.create({
      email,
      name: email,
      isRegisteredWith: AuthVendor.GOOGLE,
    });
    return newUser;
  }

  public async IsOauthAuthenticatedUser(email: string, authVendor: AuthVendor): Promise<boolean> {
    const user = await this.userService.getOneByEmail(email);
    if (user?.isRegisteredWith === authVendor) {
      return true;
    }
    return false;
  }

  public async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async verfiedPassWord(hashedPassword: string, password: string) {
    const isPasswordMatching = await bcrypt.compare(hashedPassword, password);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
