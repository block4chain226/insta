import { CreateUserDto } from 'libs/User/dto/create-user.dto';

export class RegistrationCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
