import { Module, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';
import { RegistrationCommand } from './application/command/registration/registration.command';
import { RegistrationCommandHandler } from './application/command/registration/registration.handler';
import { CqrsModule } from '@nestjs/cqrs';
import * as Joi from 'joi';
import { RmqModule } from 'libs/rmq/rmq.module';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { HashModule } from 'libs/common/hash/hahs.module';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginQuery } from './application/query/login/login.guery';
import { LoginQueryHandler } from './application/query/login/login-query.handler';
import { NotFoundException } from './application/filters/not-found.filter';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenQuery } from './application/query/jwt-token/jwt-token.query';
import { JwtTokenQueryHandler } from './application/query/jwt-token/jwt-token-query.handler';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    HashModule,
    ConfigModule.forRoot({
      envFilePath: [`apps/insta-gateway/src/auth/.env`],
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
    // {
    //   provide: 'APP_FILTER',
    //   useClass: NotFoundException,
    // },
    JwtTokenQuery,
    JwtTokenQueryHandler,
    LoginQueryHandler,
    LoginQuery,
    LocalStrategy,
    AuthService,
    RegistrationCommand,
    CreateUserDto,
    RegistrationCommandHandler,
    { provide: 'APP_PIPE', useValue: new ValidationPipe({ transform: true }) },
  ],
})
export class AuthModule {}
