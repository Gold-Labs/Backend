import { IsEmail, IsString } from 'class-validator';
import { AuthVendor } from '../type/auth-vendor.enum';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  name?: string;

  @IsString()
  password!: string;

  @IsString()
  isRegisteredWith?: AuthVendor;
}
