import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserModelFactory } from 'apps/users-app/src/factory/user-model.factory';
import {
  RMQ_USERS_PATTERN,
  RMQ_USERS_TOKEN,
} from 'libs/User/rabbitmq/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(RMQ_USERS_TOKEN.USERS_RMQ)
    private readonly usersClient: ClientProxy,
  ) {}
  async execute({ createUserDto }: CreateUserCommand): Promise<void> {
    const createdUser = this.usersClient.emit(
      RMQ_USERS_PATTERN.CREATE_USER,
      createUserDto,
    );
  }
}

//TODO gateway(handler->client) -> users-app(controller->service->UserModelFactory)
