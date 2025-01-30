import { Module } from '@nestjs/common';
import { UsersAppService } from './users-app.service';
import { UsersAppController } from './infrastructure/controllers/users-app.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'libs/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entety/user.entity';
import { UserModelFactory } from './factory/user-model.factory';
import { UserRepository } from './infrastructure/adapters/user.repository';
import { UserEntityModelFactory } from './factory/user-entity-model.factory';
import { UsersSubscriber } from './infrastructure/entety/subscribers/users.subscriber';
import { UserQueryFactory } from './factory/user-query.factory';
import { UserQueryRepository } from './infrastructure/adapters/user-query.repository';
import { HashModule } from 'libs/common/hash/hahs.module';
import { FindAllEvent } from 'apps/insta-gateway/src/users/application/events/find-all.event';
import { FindAllHandlerEvent } from 'apps/insta-gateway/src/users/application/events/find-all-handler.event';

@Module({
  imports: [
    CqrsModule,
    HashModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersAppController],
  providers: [
    FindAllEvent,
    FindAllHandlerEvent,
    UserQueryFactory,
    UserQueryRepository,
    UsersSubscriber,
    UsersAppService,
    UserModelFactory,
    UserEntityModelFactory,
    UserRepository,
  ],
})
export class UsersAppModule {}
