import { Injectable } from '@nestjs/common';
import { IModelFactory } from 'libs/common/interfaces/model-factory.interface';
import { User } from '../model/User.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../adapters/user.repository';

@Injectable()
export class UserModelFactory implements IModelFactory<User> {
  constructor(private readonly userRepository: UserRepository) {}
  create(name: string, email: string, password: string): User {
    const user = new User(name, email, password);
    const newUser = this.userRepository.create(user);
  }
}
