import { Module, Options } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { ConfigService } from '@nestjs/config';
import { url } from 'inspector';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RMQ_USERS_TOKEN.USERS_RMQ,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          urls: configService.get('RMQ_URL'),
          transport: Transport.RMQ,
          options: {
            queue: configService.get('RMQ_USERS_QUEUE'),
          },
        }),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
