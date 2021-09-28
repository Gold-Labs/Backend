import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entitiy';
import { Repository } from 'typeorm';

export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async getOneByID(id: number) {
    return await this.UserRepository.findOne(id);
  }
  async getAll() {
    const users = await this.UserRepository.find();
    console.log(users);
    return users;
  }
  async deleteOne(id) {
    return await this.UserRepository.delete(id);
  }
  async create(body) {
    //validation은 어디서????
    const newUser = await this.UserRepository.create(body);
    try {
      await this.UserRepository.save(newUser);
    } catch (e) {
      console.log(e);
    }

    return newUser;
  }

  async updateOneByID(body) {
    const id = body.id;
    const updatedContent = body.updatedContent;
    this.UserRepository.update(id, updatedContent);
  }
}
