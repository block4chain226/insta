import { IRepositoryAbstract } from 'libs/common/ports/out/repository-abstract.interface';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { User } from '../model/User.model';

export interface IUserRepository
  extends IRepositoryAbstract<User, ResponseUserDto> {}
