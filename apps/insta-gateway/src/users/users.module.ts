import { Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommand } from './application/commands/create-user.command';
import { HashModule } from 'libs/common/hash/hahs.module';
import { FindAllQuery } from './application/queries/find-all.query';
import { FindAllQueryHandler } from './application/queries/find-all.handler';
import { CreateUserHandler } from './application/commands/create-user.handler';

@Module({
  imports: [
    CqrsModule,
    HashModule,
    ClientsModule.register([
      {
        name: RMQ_USERS_TOKEN.USERS_RMQ,
        // inject: [ConfigService],
        // useFactory: (configService: ConfigService) => ({

        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users',
        },
        // }),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    CreateUserHandler,
    CreateUserCommand,
    FindAllQuery,
    FindAllQueryHandler,
    UsersService,
    { provide: 'APP_PIPE', useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class UsersModule {}
