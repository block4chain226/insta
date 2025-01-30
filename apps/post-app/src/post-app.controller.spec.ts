import { Test, TestingModule } from '@nestjs/testing';
import { PostAppController } from './post-app.controller';
import { PostAppService } from './post-app.service';

describe('PostAppController', () => {
  let postAppController: PostAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostAppController],
      providers: [PostAppService],
    }).compile();

    postAppController = app.get<PostAppController>(PostAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(postAppController.getHello()).toBe('Hello World!');
    });
  });
});
