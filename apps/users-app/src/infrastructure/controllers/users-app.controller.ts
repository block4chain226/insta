import { Controller, InternalServerErrorException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { RMQ_USERS_PATTERN } from 'libs/User/rabbitmq/constants';
import { UserModelFactory } from '../../factory/user-model.factory';
import { EventPublisher } from '@nestjs/cqrs';
import { User } from '../../domain/model/User.model';

@Controller()
export class UsersAppController {
  constructor(
    private readonly userFactory: UserModelFactory,
    private readonly publisher: EventPublisher,
  ) {}

  @MessagePattern(RMQ_USERS_PATTERN.CREATE_USER)
  async create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const user = await this.userFactory.create(name, email, password);
    console.log('🚀 ~ UsersAppController ~ create ~ user:', user);
    if (!user) throw new InternalServerErrorException('user was not created');
    return user;
  }
}

// TODO convert User to EntityUser -> save to database -> convert to User
