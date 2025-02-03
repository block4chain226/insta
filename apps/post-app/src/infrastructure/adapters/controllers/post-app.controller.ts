import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RMQ_POST_PATTERN } from 'libs/Post/rabbitmq/constants';
import { Content } from '../../../domain/models/Content.model';
import { PostFactory } from 'apps/post-app/src/domain/factory/post.factory';

@Controller('posts')
export class PostAppController {
  constructor(private readonly postFactory: PostFactory) {}

  @EventPattern(RMQ_POST_PATTERN.CREATE_POST)
  async create(@Payload() { createPostDto, files }: any) {
    const post = await this.postFactory.create(createPostDto, files);
    console.log('🚀 ~ PostAppController ~ create ~ post:', post);
    console.log('files', files);
  }
}
