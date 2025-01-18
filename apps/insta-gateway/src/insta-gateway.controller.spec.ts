import { Test, TestingModule } from '@nestjs/testing';
import { InstaGatewayController } from './insta-gateway.controller';
import { InstaGatewayService } from './insta-gateway.service';

describe('InstaGatewayController', () => {
  let instaGatewayController: InstaGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InstaGatewayController],
      providers: [InstaGatewayService],
    }).compile();

    instaGatewayController = app.get<InstaGatewayController>(InstaGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(instaGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
