import { GoogleAuthenticationService } from './google-authentication.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { TokenVerficationDto } from './dto/tokenVerificationDto';

@Controller('google-authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
  constructor(private googleAuthService: GoogleAuthenticationService) {}

  @Post()
  async authenticate(
    @Body() tokenData: TokenVerficationDto,
    @Req() request: Request,
  ) {
    const { accessTokenCookie, refreshTokenCookie } =
      await this.googleAuthenticationService.authenticate(tokenData.token);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
  }
}
