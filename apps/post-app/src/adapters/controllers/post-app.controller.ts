import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RMQ_POST_PATTERN } from 'libs/Post/rabbitmq/constants';
import { Content } from '../../domain/models/Content.model';

@Controller('posts')
export class PostAppController {
  @EventPattern(RMQ_POST_PATTERN.CREATE_POST)
  async create(@Payload() { createPostDto, files }: any) {
    const post = Content.create('image/jpeg', 'v@gmailcom', 'b');
    console.log('🚀 ~ PostAppController ~ create ~ post:', post);
    console.log('createPostDto', createPostDto);
    console.log('files', files);
  }
}
