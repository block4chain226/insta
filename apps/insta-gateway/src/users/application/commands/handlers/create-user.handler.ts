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
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(RMQ_USERS_TOKEN.USERS_RMQ)
    private readonly usersClient: ClientProxy,
    private readonly publisher: EventPublisher,
  ) {}
  async execute({ createUserDto }: CreateUserCommand): Promise<void> {
    console.log('CreateUserHandler');

    const createdUser = this.usersClient.emit(
      RMQ_USERS_PATTERN.CREATE_USER,
      createUserDto,
    );
    console.log('loh');

    console.log('🚀 ~ CreateUserHandler ~ createdUser:', createdUser);

    // const vasa = this.publisher.mergeObjectContext(createdUser);

    // vasa.commit();
  }
}

//TODO gateway(handler->client) -> users-app(controller->service->UserModelFactory)
