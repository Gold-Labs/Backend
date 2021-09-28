import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  async getUser(@Param() params) {
    console.log(params.id);
    this.userService.getOneByID(params.id);
  }

  @Get()
  async getAllUsers() {
    // console.log('get all users');
    const users = await this.userService.getAll();
    return users;
  }

  @Post()
  async createUser(@Body() body) {
    console.log('post');
    return this.userService.create(body);
  }
}
