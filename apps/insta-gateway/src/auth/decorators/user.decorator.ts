import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (value: any, context: ExecutionContext) => {
    let user = context.switchToHttp().getRequest().user;
    console.log('🚀 ~ user:', user);
    delete user._password;
    return value ? user[value] : user;
  },
);
