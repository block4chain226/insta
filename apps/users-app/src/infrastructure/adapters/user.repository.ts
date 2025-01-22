import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'libs/common/abstract/repository.abstract';
import { User } from '../../domain/model/User.model';
import { User as UserEntity } from '../../infrastructure/entety/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/ports/user-repository.interface';
import { UserEntityModelFactory } from '../../factory/user-entity-model.factory';

@Injectable()
export class UserRepository
  extends BaseRepository<User, UserEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly entity1ModelFactory: UserEntityModelFactory,
  ) {
    super(userRepository, entity1ModelFactory);
  }
}
