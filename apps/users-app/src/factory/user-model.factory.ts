import { Injectable } from '@nestjs/common';
import { IModelFactory } from 'libs/common/interfaces/model-factory.interface';
import { User } from '../domain/model/User.model';
import { UserRepository } from '../infrastructure/adapters/user.repository';
import { v4 } from 'uuid';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { User as UserEntity } from '../infrastructure/entety/user.entity';

@Injectable()
export class UserModelFactory
  implements IModelFactory<UserEntity, ResponseUserDto>
{
  constructor(private readonly userRepository: UserRepository) {}
  async create(name: string, email: string, password: string) {
    const user = new User(v4(), name, email, password);
    const newUser = await this.userRepository.create(user);
    return newUser;
  }
}
