import { Module, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { RegistrationCommand } from './application/command/registration.command';
import { RegistrationCommandHandler } from './application/command/registration.handler';
import { CqrsModule } from '@nestjs/cqrs';
import * as Joi from 'joi';
import { RmqModule } from 'libs/rmq/rmq.module';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: [
        `/Users/admin/Documents/Backend/nestjs/insta/apps/insta-gateway/src/auth/.env`,
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
  controllers: [AuthController],
  providers: [
    AuthService,
    RegistrationCommand,
    CreateUserDto,
    RegistrationCommandHandler,
    { provide: 'APP_PIPE', useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class AuthModule {}
