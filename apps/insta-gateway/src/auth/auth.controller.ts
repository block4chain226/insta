import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'libs/registration/dto/login.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistrationCommand } from './application/command/registration.command';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto): Promise<void> {
    console.log(
      '🚀 ~ AuthController ~ registration ~ createUserDto:',
      createUserDto,
    );
    return await this.commandBus.execute<RegistrationCommand, void>(
      new RegistrationCommand(createUserDto),
    );
  }
}
