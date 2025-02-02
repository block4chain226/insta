import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostFileTypes } from 'libs/Post/constant/post.constant';
import { CreatePostDto } from 'libs/Post/dto/create-post.dto';
import { CreatePostCommand } from './application/command/create/create-post.command';

@Controller('post')
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: PostFileTypes.JPEG }),
          new MaxFileSizeValidator({ maxSize: 5000 }),
          new FileTypeValidator({ fileType: PostFileTypes.MPEG4 }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ): Promise<void> {
    return await this.commandBus.execute(
      new CreatePostCommand(createPostDto, files),
    );
  }
}
