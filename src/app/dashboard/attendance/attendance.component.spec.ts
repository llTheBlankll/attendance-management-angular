import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceComponent } from './attendance.component';
import {provideRouter} from "@angular/router";
import {routes} from "../../app.routes";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
