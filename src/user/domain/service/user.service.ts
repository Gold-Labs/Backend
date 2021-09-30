import { UserRepository } from '../../infrastructure/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entitiy';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async getAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async deleteOne(id: number) {
    return await this.userRepository.delete(id);
  }
  async create(body: User) {
    console.log(body);
    const newUser = this.userRepository.create(body);
    console.log(newUser);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async update(id: number, body: Partial<User>) {
    await this.userRepository.update(id, body);
    return await this.getOne(id);
  }
}
