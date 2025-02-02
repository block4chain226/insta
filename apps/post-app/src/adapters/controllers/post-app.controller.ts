import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RMQ_POST_PATTERN } from 'libs/Post/rabbitmq/constants';

@Controller('posts')
export class PostAppController {
  @EventPattern(RMQ_POST_PATTERN.CREATE_POST)
  async create(@Payload() { createPostDto, files }: any) {
    console.log('createPostDto', createPostDto);
    console.log('files', files);
  }
}
