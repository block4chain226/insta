import { Module } from '@nestjs/common';
import { PostAppService } from './post-app.service';
import { PostAppController } from './infrastructure/adapters/controllers/post-app.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configure/configuration';
import { PostFactory } from './domain/factory/post.factory';

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
  providers: [PostAppService, PostFactory],
})
export class PostAppModule {}
