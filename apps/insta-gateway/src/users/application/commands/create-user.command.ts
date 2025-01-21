import { CreateUserDto } from 'libs/User/dto/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
