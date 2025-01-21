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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    CqrsModule,
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersAppController],
  providers: [UsersAppService, UserModelFactory, UserRepository],
})
export class UsersAppModule {}
