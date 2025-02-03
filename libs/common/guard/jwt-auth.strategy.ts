import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { TypePayload } from 'apps/insta-gateway/src/auth/application/query/jwt-token/jwt-token-query.handler';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '1234ivan',
    });
  }

  async validate(payload: TypePayload): Promise<ResponseUserDto> {
    return payload;
  }
}
