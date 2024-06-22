import { TestBed } from '@angular/core/testing';

import { AttendanceLineChartService } from './attendance-line-chart.service';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";

describe('AttendanceLineChartService', () => {
  let service: AttendanceLineChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AttendanceLineChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
