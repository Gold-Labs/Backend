import { Controller, Get, Req, UseGuards, HttpException, HttpStatus, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from '../domain/service/authentication.service';
import { KakaoAuthGuard } from '../infrastructure/guard/kakao-auth.guard';
@Controller('kakao')
export class KakaoAuthController {
  constructor(private readonly authService: AuthenticationService) {}
  @Get()
  @UseGuards(KakaoAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async kakaoAuth(@Req() req: any) {}

  @Get('redirect')
  @UseGuards(KakaoAuthGuard)
  @Redirect('http://localhost:3000')
  async kakaoAuthRedirect(@Req() req: any, @Res({ passthrough: true }) response: Response) {
    if (!req.user) {
      throw new HttpException('not user', HttpStatus.UNAUTHORIZED);
    }
    const accessToken = await this.authService.login(req.user);
    response.cookie('key', accessToken.access_token);
  }
}
