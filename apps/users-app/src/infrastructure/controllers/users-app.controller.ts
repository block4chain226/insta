import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { RMQ_USERS_PATTERN } from 'libs/User/rabbitmq/constants';
import { UserModelFactory } from '../../factory/user-model.factory';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';

@Controller()
export class UsersAppController {
  constructor(private readonly userFactory: UserModelFactory) {}

  @EventPattern(RMQ_USERS_PATTERN.CREATE_USER)
  async create(
    @Payload() createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    const { name, email, password } = createUserDto;
    const user = await this.userFactory.create(name, email, password);
    console.log('🚀 ~ UsersAppController ~ user:', user);
    return user;
  }
}
