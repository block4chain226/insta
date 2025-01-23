import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './application/commands/create-user.command';
import { HashPipe } from './pipes/hash.pipe';
import { HashService } from 'libs/common/hash/hash.service';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { FindAllQuery } from './application/queries/find-all.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UsePipes(new HashPipe(new HashService()))
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.commandBus.execute<CreateUserCommand, void>(
      new CreateUserCommand(createUserDto),
    );
  }

  @Get()
  async findAll() {
    return await this.queryBus.execute(new FindAllQuery());
  }
}
