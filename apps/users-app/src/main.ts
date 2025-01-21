import { NestFactory } from '@nestjs/core';
import { UsersAppModule } from './users-app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UsersAppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users',
      persistance: true,
      noAck: false,
    },
  });
  app.startAllMicroservices();
  await app.init();
}
bootstrap();
