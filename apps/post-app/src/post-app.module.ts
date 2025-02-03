import { Module } from '@nestjs/common';
import { PostAppService } from './post-app.service';
import { PostAppController } from './infrastructure/adapters/controllers/post-app.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configure/configuration';
import { PostFactory } from './domain/factory/post.factory';
import { CreatePostCommand } from './application/command/create/create-post.command';
import { CreatePostHandler } from './application/command/create/create-post.handler';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: 'apps/post-app/.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
  ],
  controllers: [PostAppController],
  providers: [
    PostAppService,
    CreatePostCommand,
    CreatePostHandler,
    PostFactory,
  ],
})
export class PostAppModule {}
