import { Module } from '@nestjs/common';
import { RmqModule } from 'libs/rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CqrsModule } from '@nestjs/cqrs';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { RMQ_POST_TOKEN } from 'libs/Post/rabbitmq/constants';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: ['apps/insta-gateway/src/post/.env'],
      validationSchema: Joi.object({
        RMQ_USERS_QUEUE: Joi.string().required(),
        RMQ_URL: Joi.string().required(),
      }),
    }),
    RmqModule.register({ name: RMQ_POST_TOKEN.POST_RMQ }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
