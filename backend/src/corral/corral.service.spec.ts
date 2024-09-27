import { Test, TestingModule } from '@nestjs/testing';
import { CorralService } from './corral.service';

describe('CorralService', () => {
  let service: CorralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorralService],
    }).compile();

    service = module.get<CorralService>(CorralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
