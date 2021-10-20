import { GoogleAuthenticationService } from './google-authentication.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TokenVerficationDto } from './dto/tokenVerificationDto';

@Controller('google-authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
  constructor(private googleAuthService: GoogleAuthenticationService) {}

  @Post()
  async authenticate(@Body() tokenData: TokenVerficationDto) {
    const token = await this.googleAuthService.authenticate(tokenData.token);
    return token;
  }
}
