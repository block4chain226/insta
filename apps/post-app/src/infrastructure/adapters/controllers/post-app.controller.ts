import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RMQ_POST_PATTERN } from '../../../../../../libs/Post/rabbitmq/constants';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostCommand } from 'apps/post-app/src/application/command/create/create-post.command';

@Controller('posts')
export class PostAppController {
  constructor(private readonly commandBus: CommandBus) {}
  @EventPattern(RMQ_POST_PATTERN.CREATE_POST)
  async create(@Payload() { createPostDto, files }: any) {
    await this.commandBus.execute(new CreatePostCommand(createPostDto, files));
  }
}

//TODO create post with content, create entities with embeded
