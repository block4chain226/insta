import { Module } from '@nestjs/common';
import { InstaGatewayController } from './insta-gateway.controller';
import { InstaGatewayService } from './insta-gateway.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from 'libs/common/config/configuration';
import { ExceptionFilter } from 'libs/common/filters/intrinsic.filter';
import { ProductModule } from './product/product.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductModule,

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
