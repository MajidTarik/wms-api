import { Test, TestingModule } from '@nestjs/testing';
import { AbacController } from './abac.controller';

describe('AbacController', () => {
  let controller: AbacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbacController],
    }).compile();

    controller = module.get<AbacController>(AbacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
