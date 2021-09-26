import { Repository } from 'typeorm';
import { User } from './user.entitiy';

export class UserRepository extends Repository<User> {}
