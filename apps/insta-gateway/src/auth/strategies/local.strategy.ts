import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { QueryBus } from '@nestjs/cqrs';
import { LoginQuery } from '../application/query/login/login.guery';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const loginDto = { email, password };
    const result = await this.queryBus.execute(new LoginQuery(loginDto));
    return result;
  }
}
