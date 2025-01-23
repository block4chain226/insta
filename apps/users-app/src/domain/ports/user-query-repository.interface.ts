import { IQueryRepository } from 'libs/common/ports/out/query-repository.interface';
import { User } from '../model/User.model';
import { User as UserEntity } from '../../infrastructure/entety/user.entity';

export interface IUserQueryRepository
  extends IQueryRepository<User, UserEntity> {}
