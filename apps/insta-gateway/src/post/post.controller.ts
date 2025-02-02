import { Body, Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostDto } from 'libs/Post/dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

  async create(@Body() createPostDto: CreatePostDto): Promise<void> {}
}
