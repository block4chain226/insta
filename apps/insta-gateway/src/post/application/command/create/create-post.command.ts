import { CreatePostDto } from 'libs/Post/dto/create-post.dto';

export class CreatePostCommand {
  constructor(
    public readonly createPostDto: CreatePostDto,
    public readonly files: Express.Multer.File[],
  ) {}
}
