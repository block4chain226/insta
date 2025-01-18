import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'libs/common/abstract/repository.abstract';
import { IRepositoryAbstract } from 'libs/common/ports/out/repository-abstract.interface';
import { User } from '../model/User.model';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository
  extends BaseRepository<User, ResponseUserDto>
  implements IRepositoryAbstract<User, ResponseUserDto>
{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
