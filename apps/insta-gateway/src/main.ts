import { NestFactory } from '@nestjs/core';
import { InstaGatewayModule } from './insta-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(InstaGatewayModule);
  const config = new DocumentBuilder()
    .setTitle('Shop')
    .setDescription('Description')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('insta', app, document);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
