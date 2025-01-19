import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password: string,
  ) {
    super();
  }

  // set name(value: string) {
  //   this.name = value;
  // }

  // set email(value: string) {
  //   this.email = value;
  // }

  // set password(value: string) {
  //   this.password = value;
  // }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
