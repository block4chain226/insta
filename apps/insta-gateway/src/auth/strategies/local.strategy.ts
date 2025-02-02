import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { QueryBus } from '@nestjs/cqrs';
import { LoginQuery } from '../application/query/login/login.guery';
import { User } from 'apps/users-app/src/domain/model/User.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const loginDto = { email, password };
    return await this.queryBus.execute(new LoginQuery(loginDto));
  }
}
