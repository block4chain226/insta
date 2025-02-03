import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQ_POST_TOKEN } from 'libs/Post/rabbitmq/constants';
import { RMQ_USERS_TOKEN } from 'libs/User/rabbitmq/constants';

type RmqModuleOptions = {
  name: RMQ_USERS_TOKEN | RMQ_POST_TOKEN;
};

@Module({
  imports: [],
  providers: [],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: configService.get('RMQ_URL'),
                queue: configService.get(`RMQ_${name.toUpperCase()}_QUEUE`),
              },
            }),
            imports: [ConfigModule],
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
