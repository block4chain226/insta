import { NestFactory } from '@nestjs/core';
import { PostAppModule } from './post-app.module';

async function bootstrap() {
  const app = await NestFactory.create(PostAppModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
