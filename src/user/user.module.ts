import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './application/user.controller';
import { User } from './domain/entities/user.entitiy';
import { UserService } from './domain/service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
// dependenct injection을 등록하는 것
