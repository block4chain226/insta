import { Module } from '@nestjs/common';
import { InstaGatewayController } from './insta-gateway.controller';
import { InstaGatewayService } from './insta-gateway.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from 'libs/common/config/configuration';
import { ExceptionFilter } from 'libs/common/filters/intrinsic.filter';

@Module({
  imports: [
    UsersModule,
    AuthModule,

    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: [
    //     '/Users/admin/Documents/Backend/nestjs/insta/apps/insta-gateway/.env',
    //   ],
    //   load: [configuration],
    // }),
  ],
  controllers: [InstaGatewayController],
  providers: [InstaGatewayService],
})
export class InstaGatewayModule {}
