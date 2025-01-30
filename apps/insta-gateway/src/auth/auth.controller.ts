import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'libs/registration/dto/login.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegistrationCommand } from './application/command/registration/registration.command';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { HashPipe } from '../users/pipes/hash.pipe';
import { LoginGuard } from './guards/login.guard';
import { LoginQuery } from './application/query/login/login.guery';
import { CurrentUser } from './decorators/user.decorator';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UsePipes(HashPipe)
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

  @UseGuards(LoginGuard)
  @Post('login')
  async login(@CurrentUser() user: ResponseUserDto) {
    console.log('🚀 ~ AuthController ~ login ~ LoginDto:', user);
    return user;
  }
}
