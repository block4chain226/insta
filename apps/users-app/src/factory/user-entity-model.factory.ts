import { User } from 'apps/users-app/src/domain/model/User.model';
import { IEntityModelFactory } from '../../../../libs/common/interfaces/entity-model.interface';
import { Injectable } from '@nestjs/common';
import { User as UserEntity } from '../infrastructure/entety/user.entity';

@Injectable()
export class UserEntityModelFactory
  implements IEntityModelFactory<User, UserEntity>
{
  createFromModel(model: User): UserEntity {
    const user = new UserEntity();
    user.email = model.email;
    user.id = model.id;
    user.name = model.name;
    user.password = model.password;
    return user;
  }
  createFromEntity(entity: UserEntity): User {
    return new User(entity.id, entity.name, entity.email, entity.password);
  }
}
