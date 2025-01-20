import { Module, Options } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/commands/handlers/create-user.handler';
import { CreateUserCommand } from './application/commands/create-user.command';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.registerAsync([
      {
        name: RMQ_USERS_TOKEN.USERS_RMQ,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          urls: configService.get('amqp://rabbitmqq:5672'),
          transport: Transport.RMQ,
          options: {
            queue: configService.get('users'),
          },
        }),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [CreateUserHandler, CreateUserCommand, UsersService],
})
export class UsersModule {}
