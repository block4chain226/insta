import { NestFactory } from '@nestjs/core';
import { PostAppModule } from './post-app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PostAppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'post',
    },
  });
  app.startAllMicroservices();
  await app.init();
}
bootstrap();
