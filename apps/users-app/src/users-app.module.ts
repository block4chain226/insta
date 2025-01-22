import { Module } from '@nestjs/common';
import { UsersAppService } from './users-app.service';
import { UsersAppController } from './infrastructure/controllers/users-app.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'libs/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/entety/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'libs/common/config/configuration';
import { UserModelFactory } from './factory/user-model.factory';
import { UserRepository } from './infrastructure/adapters/user.repository';
import { UserEntityModelFactory } from './factory/user-entity-model.factory';
import { UsersSubscriber } from './infrastructure/entety/subscribers/users.subscriber';
import { HashModule } from 'libs/common/hash/hahs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CqrsModule,
    HashModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersAppController],
  providers: [
    UsersSubscriber,
    UsersAppService,
    UserModelFactory,
    UserEntityModelFactory,
    UserRepository,
  ],
})
export class UsersAppModule {}
