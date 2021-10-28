import { Controller, Get, Req, UseGuards, HttpException, HttpStatus, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from '../domain/service/authentication.service';
import { NaverAuthGuard } from '../infrastructure/guard/naver-auth.guard';
@Controller('naver')
export class NaverAuthController {
  constructor(private readonly authService: AuthenticationService) {}
  @Get()
  @UseGuards(NaverAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async naverAuth(@Req() req: any) {}

  @Get('redirect')
  @UseGuards(NaverAuthGuard)
  @Redirect('http://localhost:8080/login/redirect')
  async naverAuthRedirect(@Req() req: any, @Res({ passthrough: true }) response: Response) {
    if (!req.user) {
      throw new HttpException('not user', HttpStatus.UNAUTHORIZED);
    }
    const accessToken = await this.authService.login(req.user);
    response.cookie('key', accessToken.access_token);
  }
}
