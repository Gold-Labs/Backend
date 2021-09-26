import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private UserRepository: UserRepository) {}

  getOne(email) {
    return this.UserRepository.findOne(email);
  }
  getAll() {}
  deleteOne() {}
  create() {}
}
