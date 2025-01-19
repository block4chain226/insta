import { Module } from '@nestjs/common';
import { InstaGatewayController } from './insta-gateway.controller';
import { InstaGatewayService } from './insta-gateway.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [InstaGatewayController],
  providers: [InstaGatewayService],
})
export class InstaGatewayModule {}
