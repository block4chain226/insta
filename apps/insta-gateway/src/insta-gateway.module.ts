import { Module } from '@nestjs/common';
import { InstaGatewayController } from './insta-gateway.controller';
import { InstaGatewayService } from './insta-gateway.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'libs/common/config/configuration';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  ],
  controllers: [InstaGatewayController],
  providers: [InstaGatewayService],
})
export class InstaGatewayModule {}
