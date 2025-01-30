import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { Response } from 'express';
import { error } from 'console';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('exception...........', exception.getError());
    const error1 = exception.getError();
    // const ctx = host.switchToHttp();
    // const res = ctx.getResponse<Response>();
    return throwError(() => error1);
  }
}
