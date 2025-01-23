import { BaseQueryAbstractRepository } from 'libs/common/abstract/base-query-repository.abstract';
import { User as UserEntity } from '../../infrastructure/entety/user.entity';
import { User } from '../../domain/model/User.model';
import { UserEntityModelFactory } from '../../factory/user-entity-model.factory';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserQueryRepository extends BaseQueryAbstractRepository<
  User,
  UserEntity
> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userssRepository: Repository<UserEntity>,
    private readonly userEntityModelFactory: UserEntityModelFactory,
  ) {
    super(userssRepository, userEntityModelFactory);
  }
}
