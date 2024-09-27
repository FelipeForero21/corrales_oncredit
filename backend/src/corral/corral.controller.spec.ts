import { Test, TestingModule } from '@nestjs/testing';
import { CorralController } from './corral.controller';
import { CorralService } from './corral.service';

describe('CorralController', () => {
  let controller: CorralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorralController],
      providers: [CorralService],
    }).compile();

    controller = module.get<CorralController>(CorralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
