import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';
import { UserModelFactory } from 'apps/users-app/src/factory/user-model.factory';
import {
  RMQ_USERS_PATTERN,
  RMQ_USERS_TOKEN,
} from 'libs/User/rabbitmq/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(RMQ_USERS_TOKEN.USERS_RMQ)
    private readonly usersClient: ClientProxy,
    private readonly publisher: EventPublisher,
  ) {}
  async execute({ createUserDto }: CreateUserCommand) {
    const createdUser = this.usersClient.send(
      RMQ_USERS_PATTERN.CREATE_USER,
      createUserDto,
    );

    // const vasa = this.publisher.mergeObjectContext(createdUser);

    // createdUser.commit();
  }
}

//TODO gateway(handler->client) -> users-app(controller->service->UserModelFactory)
