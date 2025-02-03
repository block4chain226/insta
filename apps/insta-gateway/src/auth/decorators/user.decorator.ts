import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntityModelFactory } from 'apps/users-app/src/factory/user-entity-model.factory';

export const CurrentUser = createParamDecorator(
  (value: any, context: ExecutionContext) => {
    let user = context.switchToHttp().getRequest().user;
    delete user._password;
    return value ? user[value] : user;
  },
);
