import { Injectable } from '@nestjs/common';

@Injectable()
export class InstaGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
