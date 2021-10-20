import { User } from './../domain/entities/user.entitiy';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../domain/service/user.service';
import { CreateUserDto } from '../domain/dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  async getUser(@Param() params: { id: string }) {
    //params는 모조건 string으로 온다.
    return this.userService.getOne(Number(params.id));
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Patch(':id')
  async updateUserById(
    @Param() params: { id: string },
    @Body() body: Partial<User>,
  ) {
    return await this.userService.update(Number(params.id), body);
  }

  @Delete(':id')
  async deleteUserById(@Param() params: { id: string }) {
    console.log(params.id);
    return await this.userService.deleteOne(Number(params.id));
  }
}
