import { Test, TestingModule } from '@nestjs/testing';
import { DataReceiverService } from './data-receiver.service';

describe('DataReceiverService', () => {
  let service: DataReceiverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataReceiverService],
    }).compile();

    service = module.get<DataReceiverService>(DataReceiverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
