import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegistrationCommand } from './registration.command';
import {
  RMQ_USERS_PATTERN,
  RMQ_USERS_TOKEN,
} from 'libs/User/rabbitmq/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@CommandHandler(RegistrationCommand)
export class RegistrationCommandHandler
  implements ICommandHandler<RegistrationCommand>
{
  constructor(
    @Inject(RMQ_USERS_TOKEN.AUTH_RMQ)
    private readonly usersClient: ClientProxy,
  ) {}
  async execute(createUserDto: RegistrationCommand): Promise<void> {
    console.log('🚀 ~ execute ~ createUserDto:', createUserDto);
    this.usersClient.send(RMQ_USERS_PATTERN.CREATE_USER, createUserDto);
  }
}
