import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/domain/service/user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { nullCheck } from 'src/util/nullCheck';
import { User } from 'src/user/domain/entities/user.entitiy';
import { CreateUserDto } from 'src/user/domain/dto/createUser.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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
      const user = await this.userService.getOneByEmail(email);
      const existUser = nullCheck(user);
      this.verfiedPassWord(hashedPassword, existUser.password!);
      const { password, ...result } = existUser;
      return result;
    } catch (error) {
      throw new HttpException(
        'Wrong credential provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verfiedPassWord(hashedPassword: string, password: string) {
    const isPasswordMatching = await bcrypt.compare(hashedPassword, password);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
