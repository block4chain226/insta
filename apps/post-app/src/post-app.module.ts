import { Module } from '@nestjs/common';
import { PostAppService } from './post-app.service';
import { PostAppController } from './adapters/controllers/post-app.controller';
import { CreatePostCommand } from 'apps/insta-gateway/src/post/application/command/create/create-post.command';
import { CreatePostHandler } from 'apps/insta-gateway/src/post/application/command/create/create-post.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [PostAppController],
  providers: [PostAppService],
})
export class PostAppModule {}
