import { GoogleAuthGuard } from './../infrastructure/guard/google-auth.guard';
import { Controller, Get, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';

@Controller('google')
export class GoogleAuthController {
  @Get()
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req: any) {}

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: any) {
    if (!req.user) {
      throw new HttpException('not user', HttpStatus.UNAUTHORIZED);
    }
    return req.user;
  }
}
