import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly password: string,
  ) {
    super();
  }
}
