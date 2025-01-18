import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'libs/common/abstract/repository.abstract';
import { User } from '../../domain/model/User.model';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/ports/user-repository.interface';

@Injectable()
export class UserRepository
  extends BaseRepository<User, ResponseUserDto>
  implements IUserRepository
{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
