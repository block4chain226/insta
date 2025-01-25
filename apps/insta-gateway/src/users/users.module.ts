import { Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommand } from './application/commands/create-user.command';
import { HashModule } from 'libs/common/hash/hahs.module';
import { FindAllQuery } from './application/queries/find-all.query';
import { FindAllQueryHandler } from './application/queries/find-all.handler';
import { CreateUserHandler } from './application/commands/create-user.handler';
import * as Joi from 'joi';

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
    ClientsModule.registerAsync([
      {
        name: RMQ_USERS_TOKEN.USERS_RMQ,
        inject: [ConfigService],
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: configService.get('RMQ_URL'),
            queue: configService.get('RMQ_USERS_QUEUE'),
          },
        }),
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
