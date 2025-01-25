import { Module, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { RegistrationCommand } from './application/command/registration.command';
import { RegistrationCommandHandler } from './application/command/registration.handler';
import { CqrsModule } from '@nestjs/cqrs';
import * as Joi from 'joi';

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
  controllers: [AuthController],
  providers: [
    AuthService,
    RegistrationCommand,
    RegistrationCommandHandler,
    { provide: 'APP_PIPE', useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class AuthModule {}
