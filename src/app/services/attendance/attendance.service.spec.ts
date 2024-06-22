import { TestBed } from '@angular/core/testing';

import { AttendanceService } from './attendance.service';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('AttendanceService', () => {
  let service: AttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
