import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from 'libs/common/filters/intrinsic.filter';
import { NotFoundError, Observable } from 'rxjs';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class NotFoundException extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    console.log('dfmgvldmkgdv,dlf,vfd...', exception.message);

    const res = ctx.getResponse();
    // return res.json('error');
  }
}
