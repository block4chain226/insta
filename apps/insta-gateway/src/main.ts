import { NestFactory } from '@nestjs/core';
import { InstaGatewayModule } from './insta-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(InstaGatewayModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
