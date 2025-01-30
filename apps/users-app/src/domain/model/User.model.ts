import { AggregateRoot } from '@nestjs/cqrs';
import { IUser } from './User.interface';
import { BadRequestException } from '@nestjs/common';

export class User extends AggregateRoot implements IUser {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  constructor() {
    super();
  }

  set id(value: string) {
    if (value === null || value === ' ') {
      throw new Error('User model id cant be null');
    }
    this._id = value;
  }

  set email(value: string) {
    if (value === null || value === ' ') {
      throw new Error('User model email cant be null');
    }
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
