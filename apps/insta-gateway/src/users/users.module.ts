import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/commands/handlers/create-user.handler';
import { CreateUserCommand } from './application/commands/create-user.command';

@Module({
  imports: [
    CqrsModule,
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
  providers: [CreateUserHandler, CreateUserCommand, UsersService],
})
export class UsersModule {}
