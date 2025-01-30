import { Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommand } from './application/commands/create-user.command';
import { HashModule } from 'libs/common/hash/hahs.module';
import { FindAllQuery } from './application/queries/find-all.query';
import { FindAllQueryHandler } from './application/queries/find-all.handler';
import { CreateUserHandler } from './application/commands/create-user.handler';
import * as Joi from 'joi';
import { RmqModule } from 'libs/rmq/rmq.module';
import { QueryFailedFilter } from './filters/query-exception-error.filter';
import { NotFoundFilter } from './filters/not-found.filter';

@Module({
  imports: [
    CqrsModule,
    HashModule,
    ConfigModule.forRoot({
      envFilePath: [
        `/Users/admin/Documents/Backend/nestjs/insta/apps/insta-gateway/src/users/.env`,
      ],
      validationSchema: Joi.object({
        RMQ_USERS_QUEUE: Joi.string().required(),
        RMQ_URL: Joi.string().required(),
      }),
    }),
    RmqModule.register({
      name: RMQ_USERS_TOKEN.USERS_RMQ,
    }),
  ],
  controllers: [UsersController],
  providers: [
    { provide: 'APP_FILTER', useClass: NotFoundFilter },
    CreateUserHandler,
    CreateUserCommand,
    FindAllQuery,
    FindAllQueryHandler,
    UsersService,
    { provide: 'APP_PIPE', useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class UsersModule {}
