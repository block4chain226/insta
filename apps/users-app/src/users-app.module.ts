import { Module } from '@nestjs/common';

import { UsersAppService } from './users-app.service';
import { UsersAppController } from './infrastructure/controllers/users-app.controller';
import { CreateUserCommand } from 'apps/insta-gateway/src/users/application/commands/create-user.command';
import { CreateUserHandler } from 'apps/insta-gateway/src/users/application/commands/handlers/create-user.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [UsersAppController],
  providers: [UsersAppService, CreateUserCommand, CreateUserHandler],
})
export class UsersAppModule {}
