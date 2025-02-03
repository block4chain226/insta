import { Injectable } from '@nestjs/common';

@Injectable()
export class PostAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
