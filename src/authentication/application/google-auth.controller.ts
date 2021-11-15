import { GoogleAuthGuard } from './../infrastructure/guard/google-auth.guard';
import { Controller, Get, Req, UseGuards, HttpException, HttpStatus, Res, Redirect } from '@nestjs/common';
import { AuthenticationService } from '../domain/service/authentication.service';
import { Response } from 'express';

@Controller('google')
export class GoogleAuthController {
  constructor(private readonly authService: AuthenticationService) {}
  @Get()
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req: any) {}

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect('http://localhost:8000/login/redirect')
  async googleAuthRedirect(@Req() req: any, @Res({ passthrough: true }) response: Response) {
    if (!req.user) {
      throw new HttpException('not user', HttpStatus.UNAUTHORIZED);
    }
    const accessToken = await this.authService.login(req.user);
    response.cookie('key', accessToken.access_token);
  }
}
