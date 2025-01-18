import { Module } from '@nestjs/common';
import { InstaGatewayController } from './insta-gateway.controller';
import { InstaGatewayService } from './insta-gateway.service';

@Module({
  imports: [],
  controllers: [InstaGatewayController],
  providers: [InstaGatewayService],
})
export class InstaGatewayModule {}
