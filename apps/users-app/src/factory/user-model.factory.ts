import { Injectable } from '@nestjs/common';
import { IModelFactory } from 'libs/common/interfaces/model-factory.interface';
import { User } from '../model/User.model';

@Injectable()
export class UserModelFactory implements IModelFactory<User> {
  create(name: string, email: string, password: string): User {
    const user = new User(name, email, password);
  }
}
