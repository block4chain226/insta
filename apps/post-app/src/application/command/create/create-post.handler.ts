import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { PostFactory } from 'apps/post-app/src/domain/factory/post.factory';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private readonly postFactory: PostFactory) {}
  async execute({ createPostDto, files }: CreatePostCommand): Promise<any> {
    await this.postFactory.create(createPostDto, files);
  }
}
