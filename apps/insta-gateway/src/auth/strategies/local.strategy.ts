import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { QueryBus } from '@nestjs/cqrs';
import { LoginQuery } from '../application/query/login/login.guery';
import { User } from 'apps/users-app/src/domain/model/User.model';
import { UserEntityModelFactory } from 'apps/users-app/src/factory/user-entity-model.factory';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly entityFactory: UserEntityModelFactory,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<ResponseUserDto> {
    const loginDto = { email, password };
    const user = await this.queryBus.execute(new LoginQuery(loginDto));
    const uu = { id: user._id, name: user._name, email: user._email };
    return plainToInstance(ResponseUserDto, uu);
  }
}
