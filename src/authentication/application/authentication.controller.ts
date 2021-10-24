import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/user/domain/dto/createUser.dto';
import { AuthenticationService } from '../domain/service/authentication.service';
import { JwtAuthGuard } from '../infrastructure/guard/jwt-auth.guard';
import { LocalAuthGuard } from '../infrastructure/guard/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
