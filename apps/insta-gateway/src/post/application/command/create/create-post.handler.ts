import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_POST_PATTERN, RMQ_POST_TOKEN } from 'libs/Post/rabbitmq/constants';

@Injectable()
@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject(RMQ_POST_TOKEN.POST_RMQ) private readonly postClient: ClientProxy,
  ) {}
  async execute({ createPostDto, files }: CreatePostCommand): Promise<any> {
    this.postClient.emit(RMQ_POST_PATTERN.CREATE_POST, {
      createPostDto,
      files,
    });
  }
}
