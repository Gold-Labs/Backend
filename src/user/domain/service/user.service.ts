import { UserRepository } from '../../infrastructure/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entitiy';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async getOneByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async getAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async deleteOne(id: number) {
    return await this.userRepository.delete(id);
  }
  async create(body: Partial<CreateUserDto>) {
    const newUser = this.userRepository.create(body);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async update(id: number, body: Partial<User>) {
    await this.userRepository.update(id, body);
    return await this.getOne(id);
  }
}
