import { TestBed } from '@angular/core/testing';

import { AttendanceSubscriberWebSocketService } from './attendance-subscriber-web-socket.service';

describe('AttendanceSubscriberWebSocketService', () => {
  let service: AttendanceSubscriberWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceSubscriberWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
