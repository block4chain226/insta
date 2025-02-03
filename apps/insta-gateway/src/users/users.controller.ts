import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'libs/User/dto/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './application/commands/create-user.command';
import { HashPipe } from './pipes/hash.pipe';
import { HashService } from 'libs/common/hash/hash.service';
import { ResponseUserDto } from 'libs/User/dto/response-user.dto';
import { FindAllQuery } from './application/queries/find-all.query';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { JwtAuthGuard } from 'libs/common/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UsePipes(new HashPipe(new HashService()))
  // @UseInterceptors(GrpcToHttpInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.commandBus.execute<CreateUserCommand, void>(
      new CreateUserCommand(createUserDto),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.queryBus.execute(new FindAllQuery());
  }
}
