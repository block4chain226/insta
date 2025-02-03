import {
  Body,
  Controller,
  FileTypeValidator,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from 'libs/Post/dto/create-post.dto';
import { fileTypes } from 'libs/Post/constant/post.constant';
import { RMQ_POST_PATTERN, RMQ_POST_TOKEN } from 'libs/Post/rabbitmq/constants';
import { ClientProxy } from '@nestjs/microservices';

@Controller('posts')
export class PostController {
  constructor(
    @Inject(RMQ_POST_TOKEN.POST_RMQ) private readonly postClient: ClientProxy,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: new RegExp(fileTypes.join('|')),
          }),
          new MaxFileSizeValidator({ maxSize: 500000 }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): Promise<void> {
    this.postClient.emit(RMQ_POST_PATTERN.CREATE_POST, {
      createPostDto,
      files,
    });
  }
}
