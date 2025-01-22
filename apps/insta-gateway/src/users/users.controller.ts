import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './application/commands/create-user.command';
import { HashPipe } from './pipes/hash.pipe';
import { HashService } from 'libs/common/hash/hash.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @UsePipes(new HashPipe(new HashService()))
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.commandBus.execute<CreateUserCommand, void>(
      new CreateUserCommand(createUserDto),
    );
  }
}
