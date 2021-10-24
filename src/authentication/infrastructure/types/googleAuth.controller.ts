import { AuthenticationService } from 'src/authentication/authentication.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleAuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req: Response) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
