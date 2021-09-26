import { IsNotEmpty, IsString } from 'class-validator';

export class TokenVerficationDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
