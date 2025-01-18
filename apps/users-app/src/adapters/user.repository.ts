import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'libs/common/abstract/repository.abstract';
import { IRepositoryAbstract } from 'libs/common/ports/out/repository-abstract.interface';
import { User } from '../model/User.model';

@Injectable()
export class UserRepository
  extends BaseRepository<User, ResponseUserDto>
  implements IRepositoryAbstract<User, ResponseUserDto> {}
