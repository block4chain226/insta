import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtTokenQuery } from './jwt-token.query';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

type TypePayload = { id: string; name: string; email: string };

@QueryHandler(JwtTokenQuery)
export class JwtTokenQueryHandler implements IQueryHandler<JwtTokenQuery> {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async execute(user: JwtTokenQuery): Promise<string> {
    const payload: TypePayload = {
      id: user['_id'],
      name: user['_name'],
      email: user['_email'],
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.config.get('EXPIRES_IN'),
    });
  }
}
