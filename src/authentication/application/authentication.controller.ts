import { Controller, Post, UseGuards, Request, Get, Body, Redirect, Res, HttpException, HttpStatus, Req } from '@nestjs/common';
import { Response} from 'express';
import { CreateUserDto } from 'src/user/domain/dto/createUser.dto';
import { AuthenticationService } from '../domain/service/authentication.service';
import { JwtAuthGuard } from '../infrastructure/guard/jwt-auth.guard';
import { LocalAuthGuard } from '../infrastructure/guard/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    if(!req.user){
      throw new HttpException('not user', HttpStatus.UNAUTHORIZED)
    }
    const accessToken = this.authService.login(req.user);
    return accessToken
  }

  @Post('/register')
  async register(@Body() data: CreateUserDto) {
    console.log(data)
    return await this.authService.register(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('/duplicate-check')
  async duplicateCheck(@Body() {email}:{email:string}){
    console.log(email)
    return await this.authService.duplicateCheck(email)
  }
  
}

