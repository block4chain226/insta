import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from 'libs/Post/dto/create-post.dto';
import { CreatePostCommand } from './application/command/create/create-post.command';
import { fileTypes } from 'libs/Post/constant/post.constant';

@Controller('posts')
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

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
    return await this.commandBus.execute(
      new CreatePostCommand(createPostDto, files),
    );
  }
}
