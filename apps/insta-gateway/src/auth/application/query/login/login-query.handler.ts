import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LoginQuery } from './login.guery';
import {
  RMQ_USERS_PATTERN,
  RMQ_USERS_TOKEN,
} from 'libs/User/rabbitmq/constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HashService } from 'libs/common/hash/hash.service';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { log } from 'console';
import { User } from 'apps/users-app/src/domain/model/User.model';

@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
  constructor(
    @Inject(RMQ_USERS_TOKEN.USERS_RMQ)
    private readonly usersClient: ClientProxy,
    private readonly hashService: HashService,
  ) {}

  async execute({ loginDto }: LoginQuery): Promise<User> {
    try {
      const userObservable = this.usersClient.send(
        RMQ_USERS_PATTERN.LOGIN,
        loginDto,
      );
      const user = await firstValueFrom(userObservable);
      if (
        user &&
        (await this.hashService.compare(loginDto.password, user._password))
      ) {
        return user;
      }
    } catch (error) {
      console.log('🚀 ~ LoginQueryHandler ~ execute ~ r:', error);
    }
  }
}
