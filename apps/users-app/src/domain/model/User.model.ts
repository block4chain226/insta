import { AggregateRoot } from '@nestjs/cqrs';
import { IUser } from './User.interface';
import { BadRequestException } from '@nestjs/common';

export class User extends AggregateRoot implements IUser {
  // regexs = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private _id: string,
    private _name: string,
    private _email: string,
    private _password: string,
  ) {
    super();
  }

  set id(value: string) {
    if (value === null || value === ' ') {
      throw new Error('User model id cant be null');
    }
    this._id = value;
  }

  set email(value: string) {
    // if (!this.regexs.test(value)) {
    //   throw new Error('User model: not correct email');
    // }
    this._email = value;
  }

  set name(value: string) {
    if (value === null || value === ' ') {
      throw new BadRequestException('User model name cant be null');
    }
    this._name = value;
  }

  set password(value: string) {
    if (value === null || value === ' ') {
      throw new Error('User model password cant be null');
    }
    this._password = value;
  }

  get id(): string {
    return this.id;
  }

  get name(): string {
    return this.name;
  }

  get email(): string {
    return this.email;
  }

  get password(): string {
    return this.password;
  }
}
