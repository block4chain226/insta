import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  RMQ_USERS_PATTERN,
  RMQ_USERS_TOKEN,
} from 'libs/User/rabbitmq/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { User } from 'apps/users-app/src/domain/model/User.model';
import { lastValueFrom } from 'rxjs';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(RMQ_USERS_TOKEN.USERS_RMQ)
    private readonly usersClient: ClientProxy,
    private readonly publisher: EventPublisher,
  ) {}
  async execute({ createUserDto }: CreateUserCommand) {
    let createdUser = this.usersClient.send(
      RMQ_USERS_PATTERN.CREATE_USER,
      createUserDto,
    );
    const createdUserPromise = await lastValueFrom(createdUser);
    const user = plainToInstance(User, createdUserPromise);
    user.commit();
  }
}
