import { Controller, Get } from '@nestjs/common';
import { InstaGatewayService } from './insta-gateway.service';

@Controller()
export class InstaGatewayController {
  constructor(private readonly instaGatewayService: InstaGatewayService) {}

  @Get()
  getHello(): string {
    return this.instaGatewayService.getHello();
  }
}
