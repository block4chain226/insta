import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { RMQ_USERS_PATTERN } from 'libs/User/rabbitmq/constants';

@Controller()
export class UsersAppController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(RMQ_USERS_PATTERN.CREATE_USER)
  create(@Payload() createUserDto: CreateUserDto): string {
    console.log(
      '🚀 ~ UsersAppController ~ create ~ createUserDto:',
      createUserDto,
    );
    return;
  }
}
