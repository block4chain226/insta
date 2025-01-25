import { Module, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { RegistrationCommand } from './application/command/registration.command';
import { RegistrationCommandHandler } from './application/command/registration.handler';
import { CqrsModule } from '@nestjs/cqrs';
import configuration from 'libs/common/config/configuration';

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
          queue: 'auth1',
          queueOptions: {
            // durable: false,
          },
        },
        // }),
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
