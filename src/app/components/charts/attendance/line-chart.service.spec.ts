import { TestBed } from '@angular/core/testing';

import { AttendanceLineChartService } from './attendance-line-chart.service';

describe('LineChartService', () => {
  let service: AttendanceLineChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceLineChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
