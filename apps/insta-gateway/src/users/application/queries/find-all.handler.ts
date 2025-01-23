import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllQuery } from './find-all.query';
import {
  RMQ_USERS_PATTERN,
  RMQ_USERS_TOKEN,
} from 'libs/User/rabbitmq/constants';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FindAllEvent } from '../events/find-all.event';

@QueryHandler(FindAllQuery)
export class FindAllQueryHandler implements IQueryHandler<FindAllQuery> {
  constructor(
    @Inject(RMQ_USERS_TOKEN.USERS_RMQ)
    private readonly usersClient: ClientProxy,
    private readonly publisher: EventPublisher,
  ) {}
  async execute() {
    const user = await firstValueFrom(
      this.usersClient.send(RMQ_USERS_PATTERN.FIND_ALL, {}),
    );
    console.log('🚀 ~ FindAllQueryHandler ~ execute ~ user:', user[0]);
  }
}
