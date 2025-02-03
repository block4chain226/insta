import { Injectable } from '@nestjs/common';
import { IModelFactory } from 'libs/common/interfaces/model-factory.interface';
import { Post } from '../models/Post.model';
import { ResponsePostDto } from 'libs/Post/dto/response-post.dto';
import { CreatePostDto } from 'libs/Post/dto/create-post.dto';
import { Content } from '../models/Content.model';

@Injectable()
export class PostFactory implements IModelFactory<Post, ResponsePostDto> {
  constructor() {}

  async create(
    createPostDto: CreatePostDto,
    files: Express.Multer.File[],
  ): Promise<ResponsePostDto> {
    const content = Content.create('image/jpeg', 'http//:vasa.com/111', '111');
    console.log('🚀 ~ PostFactory ~ content:', content);
    return;
  }
}
