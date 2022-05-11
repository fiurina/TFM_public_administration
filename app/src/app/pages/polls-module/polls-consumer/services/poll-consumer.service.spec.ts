import { TestBed } from '@angular/core/testing';

import { PollConsumerService } from './poll-consumer.service';

describe('PollConsumerService', () => {
  let service: PollConsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollConsumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
