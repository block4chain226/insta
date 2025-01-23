import { Controller, InternalServerErrorException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { RMQ_USERS_PATTERN } from 'libs/User/rabbitmq/constants';
import { UserModelFactory } from '../../factory/user-model.factory';
import { User } from '../../domain/model/User.model';
import { UserQueryFactory } from '../../factory/user-query.factory';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';

@Controller()
export class UsersAppController {
  constructor(
    private readonly userFactory: UserModelFactory,
    private readonly userQueryFactory: UserQueryFactory,
  ) {}

  @MessagePattern(RMQ_USERS_PATTERN.CREATE_USER)
  async create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const user = await this.userFactory.create(name, email, password);
    if (!user) throw new InternalServerErrorException('user was not created');
    return user;
  }

  @MessagePattern(RMQ_USERS_PATTERN.FIND_ALL)
  async findAll(@Payload() query: object): Promise<ResponseUserDto[]> {
    return await this.userQueryFactory.findAll();
  }
}

// TODO convert User to EntityUser -> save to database -> convert to User
