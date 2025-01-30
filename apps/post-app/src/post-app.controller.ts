import { Controller, Get } from '@nestjs/common';
import { PostAppService } from './post-app.service';

@Controller()
export class PostAppController {
  constructor(private readonly postAppService: PostAppService) {}

  @Get()
  getHello(): string {
    return this.postAppService.getHello();
  }
}
