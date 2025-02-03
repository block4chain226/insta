import {
  Controller,
  InternalServerErrorException,
  UseFilters,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { RMQ_USERS_PATTERN } from 'libs/User/rabbitmq/constants';
import { UserModelFactory } from '../../factory/user-model.factory';
import { User } from '../../domain/model/User.model';
import { UsersQuery } from '../../factory/user-query';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { LoginDto } from 'libs/registration/dto/login.dto';
import { ExceptionFilter } from 'libs/common/filters/intrinsic.filter';
import { RpcExceptionFilter } from 'apps/users-app/filters/rpc-exception.filter';

@Controller()
export class UsersAppController {
  constructor(
    private readonly userFactory: UserModelFactory,
    private readonly usersQuery: UsersQuery,
  ) {}

  @UseFilters(new RpcExceptionFilter())
  @MessagePattern(RMQ_USERS_PATTERN.CREATE_USER)
  async create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const user = await this.userFactory.create(name, email, password);
    if (!user) throw new InternalServerErrorException('user was not created');
    return user;
  }

  @MessagePattern(RMQ_USERS_PATTERN.FIND_ALL)
  async findAll(@Payload() query: object): Promise<ResponseUserDto[]> {
    return await this.usersQuery.findAll();
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern(RMQ_USERS_PATTERN.LOGIN)
  async login(@Payload() loginDto: LoginDto): Promise<User> {
    return await this.usersQuery.login(loginDto);
  }
}

// TODO convert User to EntityUser -> save to database -> convert to User
