import { Module } from '@nestjs/common';
import { PostAppController } from './post-app.controller';
import { PostAppService } from './post-app.service';

@Module({
  imports: [],
  controllers: [PostAppController],
  providers: [PostAppService],
})
export class PostAppModule {}
