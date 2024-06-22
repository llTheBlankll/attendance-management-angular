import { TestBed } from '@angular/core/testing';

import { GradeLevelService } from './grade-level.service';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";

describe('GradeLevelService', () => {
  let service: GradeLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(GradeLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
