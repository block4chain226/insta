import { User } from '../domain/model/User.model';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { UserQueryRepository } from '../infrastructure/adapters/user-query.repository';
import { Injectable } from '@nestjs/common';
import { LoginDto } from 'libs/registration/dto/login.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersQuery {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}
  async findAll(): Promise<ResponseUserDto[]> {
    const user = await this.userQueryRepository.findAll();
    return plainToInstance(ResponseUserDto, user);
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    return await this.userQueryRepository.findOneBy({ email });
  }
}
