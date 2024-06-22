import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDashboardComponent } from './teacher-dashboard.component';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('TeacherDashboardComponent', () => {
  let component: TeacherDashboardComponent;
  let fixture: ComponentFixture<TeacherDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherDashboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
