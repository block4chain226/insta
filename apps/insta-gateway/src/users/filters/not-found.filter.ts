import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { NotFoundError } from 'rxjs';

@Catch()
export class NotFoundFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    console.log('dfmgvldmkgdv,dlf,vfd...', exception);

    const res = ctx.getResponse();
    return res.json(exception.response);
  }
}
