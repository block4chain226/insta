import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RMQ_POST_PATTERN } from '../../../../../libs/Post/rabbitmq/constants';
import { Content } from '../../domain/models/Content.model';

@Controller('posts')
export class PostAppController {
  @EventPattern(RMQ_POST_PATTERN)
  async create(@Payload() { createPostDto, files }: any) {
    const post = Content.create('image/jpeg', 'http//:vasa.com/111', '111');
    console.log('🚀 ~ PostAppController ~ create ~ post:', post);
    console.log('createPostDto', createPostDto);
    console.log('files', files);
  }
}

//TODO create post with content, create entities with embeded maybe refactor post-gateway and posts-app(move application from post-gateway to posts-app, invoke rmq from post.controller)
