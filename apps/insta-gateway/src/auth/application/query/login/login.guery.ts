import { LoginDto } from 'libs/registration/dto/login.dto';

export class LoginQuery {
  constructor(public readonly loginDto: LoginDto) {}
}
